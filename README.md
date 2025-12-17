✍️ GenAI Creative Writing
An AI‑powered creative writing tool built with TypeScript, Vite, and Google Gemini.

📌 Overview
GenAI Creative Writing is an interactive web application that helps users generate creative text—stories, poems, ideas, and more—using Google’s Gemini model. It provides a clean UI, modular structure, and fast development environment.

✨ Features
🤖 AI‑generated creative writing using Gemini

⚡ Fast Vite development environment

🧩 Component‑based architecture

🎨 Simple, clean UI

🔑 Environment‑based API key configuration

🛠️ Tech Stack
Technology	Purpose
TypeScript	Core logic & type safety
Vite	Build tool & dev server
React	UI components
Gemini API	AI text generation
HTML / CSS	Layout & styling
📁 Project Structure
Code
GenAI-creative-writing/
│
├── components/          # UI components
├── services/            # Gemini API service logic
├── App.tsx              # Main application component
├── index.tsx            # App entry point
├── index.html           # Root HTML file
├── constants.ts         # Static values & config
├── metadata.json        # App metadata
├── types.ts             # TypeScript types
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite configuration
▶️ Getting Started
1. Clone the repository
bash
git clone https://github.com/BuhlaluseNgcobo/GenAI-creative-writing
cd GenAI-creative-writing
2. Install dependencies
bash
npm install
3. Add your Gemini API key
Create a .env.local file in the project root:

Code
GEMINI_API_KEY=your_key_here
4. Run the development server
bash
npm run dev
Your app will be available at a local development URL (usually http://localhost:5173).

🚀 Deployment
This project can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

Build the production bundle:

bash
npm run build
Then deploy the dist/ folder.

📌 Future Enhancements
Add genre‑specific writing modes

Add story continuation mode

Add user‑saved writing history

Add UI themes or dark mode

Add prompt templates for beginners

🤝 Contributing
Contributions are welcome. Feel free to fork the repo and submit pull requests.
