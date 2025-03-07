import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

// Initialize GROQ client with your API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Ensure you have GROQ_API_KEY in your environment variables
});

// Model currently in use
const model = "llama-3.3-70b-versatile"
// Inform the AI what should it focus on when trying to give answers to users.
const systemInstruction = `You are a flashcard creator. Your task is to generate clear, concise, and effective flashcards on various topics. Each flashcard should consist of a question on one side and the corresponding answer on the other. Follow these guidelines:

1. Keep questions and answers brief and to the point.
2. Focus on one key concept per flashcard.
3. Use simple language to ensure clarity.
4. For definitions, put the term on one side and its meaning on the other.
5. For facts, put the question on one side and the specific fact on the other.
6. For processes or lists, consider breaking them into multiple cards.
7. Avoid overly complex or ambiguous questions.
8. Ensure that the answer directly corresponds to the question.
9. Use a consistent format for similar types of information.
10. When appropriate, include relevant examples or mnemonics.
11. Tailor the difficulty level to the intended audience.
12. Avoid using true/false questions unless absolutely necessary.
13. Only generate 10 flashcards.

Your goal is to create flashcards that facilitate efficient learning and memorization. Be prepared to generate flashcards on a wide range of subjects, from academic disciplines to practical skills.

Return in the following JSON format without the markdown and remove trailing backticks too.
{
    "flashcards": [{
        "front": str,
        "back": str
    }]
}
`;

export async function POST(req) {
  // Assuming the request body contains the initial user message
  const contents = await req.json();

  const reqBody = {
    messages: [
      {
        role: "system",
        content: systemInstruction,
      },
      {
        role: "user",
        content: contents.text,
      },
    ],
    model: model,
    max_tokens: 8192,
    temperature: 1,
    top_p: 0.95,
  };

  const response = await groq.chat.completions.create(reqBody);

  const responseData = response.choices[0].message.content;

  const JSONData = JSON.parse(responseData).flashcards;

  // Parse the JSON response from the GROQ API
  // console.log("data: ", JSONData);

  // Return the flashcards as a JSON response
  return NextResponse.json(JSONData);
}