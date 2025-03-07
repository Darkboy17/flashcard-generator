"use client";

import { useUser, useSession } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import {
  Card,
  CardActionArea,
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // Add loading state
  const router = useRouter();

  const { session } = useSession();

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate flashcards.");
      return;
    }

    setIsGenerating(true); // Start loading

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();

      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error("An error occurred while generating flashcards. Please try again.");
    } finally {
      setIsGenerating(false); // Stop loading
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      toast("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    try {
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          toast.warning("Flashcard collection with the same name already exists.");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }

      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();
      toast.success("Flashcards saved successfully!");
      handleClose();
      setName("");
      setTimeout(() => {
        router.push("/flashcards");
      }, 4000);

    } catch (error) {
      console.error("Error saving flashcards:", error);
      toast.success("An error occurred while saving flashcards. Please try again.");
    }
  };

  // Check authentication status
  useEffect(() => {
    if (isLoaded && !session) {
      toast.error("Please sign in to access this page."); // Notify the user
      router.push("/"); // Redirect to the home page
    }
  }, [isLoaded, session, router]);

  // Show a loading spinner and label while checking authentication
  if (!isLoaded) {
    return (
      <Box
        display="flex"
        flexDirection="column" // Stack items vertically
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // Center the content vertically
        gap={2} // Add spacing between spinner and text
      >
        <CircularProgress /> {/* MUI loading spinner */}
        <Typography variant="body1" color="textSecondary">
          Authenticating...
        </Typography> {/* Label below the spinner */}
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")} // Redirect to home page
          sx={{ mb: 2 }} // Add spacing below the button
        >
          Go to Homepage
        </Button>

        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter topics that you want to generate flashcards for"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={isGenerating} // Disable button while generating
        >
          {isGenerating ? "Generating..." : "Generate Flashcards"}
        </Button>

        {/* Show loading spinner and message while generating flashcards */}
        {isGenerating && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{ mt: 2 }}
          >
            <CircularProgress /> {/* MUI loading spinner */}
            <Typography variant="body1" color="textSecondary">
              Generating flashcards...
            </Typography> {/* Label below the spinner */}
          </Box>
        )}
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(index);
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                            backfaceVisibility: "hidden", // Add this line
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}