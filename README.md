# Flashcard Generator

## Flashcard Generator Demo

[Live Demo](https://flashcard-generator-ptb3duxqz-darkboy17s-projects.vercel.app)

The Flashcard Generator is a web application that allows users to create, save, and study flashcards on various topics using AI. It leverages modern technologies like Next.js, Firebase, and Clerk for authentication and data storage. Whether you're a student, teacher, or lifelong learner, this tool makes it easy to generate and organize flashcards for efficient learning.

## Features

- **AI-Powered Flashcard Generation:** Enter a topic or text, and the app generates flashcards automatically.
- **Save and Organize Flashcards:** Save your flashcards to collections for easy access later.
- **Interactive Flashcards:** Flip cards to view the question and answer.
- **User Authentication:** Secure sign-up and login using Clerk.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.
- **Toast Notifications:** Real-time feedback for actions like saving flashcards or errors.

## Technologies Used

### Frontend:
- **Next.js** - React framework for server-side rendering and static site generation.
- **Material-UI (MUI)** - UI component library for a polished and responsive design.
- **React Hot Toast** - For toast notifications.

### Backend:
- **Firebase Firestore** - NoSQL database for storing flashcards and user data.
- **Clerk** - Authentication and user management.

### AI Integration:
- **Custom API** for generating flashcards using AI models.

### Deployment:
- **Vercel** - For hosting the Next.js application.

## Getting Started

Follow these steps to set up and run the Flashcard Generator locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled
- Clerk account for authentication

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/flashcard-generator.git
cd flashcard-generator
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Set up environment variables:

Create a `.env.local` file in the root directory and add the following Firebase and Clerk configuration:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open the app in your browser:

```
http://localhost:3000
```

## Usage

### Sign Up or Log In
- Create an account or log in using the Clerk authentication system.

### Generate Flashcards
- Enter a topic or text in the input field and click **Generate Flashcards**.
- The app will generate a set of flashcards using AI.

### Save Flashcards
- Click **Save** to store your flashcards in a collection.

### Study Flashcards
- View your saved flashcards and flip them to test your knowledge.

## Folder Structure

```plaintext
flashcard-generator/
├── public/               # Static assets (images, icons, etc.)
├── src/
│   ├── app/              # Next.js app router (pages and layouts)
│   ├── components/       # Reusable React components
│   ├── firebase/         # Firebase configuration and utilities
│   ├── styles/           # Global styles and themes
│   └── utils/            # Utility functions and helpers
├── .env.local            # Environment variables (not tracked by Git)
├── .gitignore            # Files and folders to ignore in Git
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js** for providing a powerful framework for building React applications.
- **Firebase** for seamless backend integration.
- **Clerk** for simplifying user authentication.
- **Material-UI** for beautiful and responsive UI components.
- **Groq API** for providing free access to near-production level LLMs.
