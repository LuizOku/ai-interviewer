# AI Interviewer

A Next.js application that simulates real job interviews using AI. Practice your interview skills with an AI interviewer that provides real-time feedback and natural conversation flow.

## Demo

🚀 **[Live Demo](https://ai-interviewer.vercel.app/)**

## Features

- 🎤 Real-time audio recording and transcription
- 🤖 AI-powered interview questions and responses
- 💬 Natural conversation flow with context-aware follow-ups
- 📱 Responsive design for all devices

## Tech Stack

- Next.js 15
- TypeScript
- OpenAI API
- Tailwind CSS
- WebRTC for audio handling

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-interviewer.git
cd ai-interviewer
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── interviews/    # Interview-related endpoints
│   │   └── session/       # Session management endpoints
│   ├── history/           # Interview history page
│   ├── interview/         # Interview flow page
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # UI components
├── hooks/                # Custom React hooks
├── models/              # TypeScript interfaces
└── __tests__/          # Test files
```

## Development

- Run tests: `yarn test`
- Lint code: `yarn lint`
- Build for production: `yarn build`

## Requirements

- Node.js 18+
- Modern browser with microphone access
- OpenAI API key

## Contributing

Feel free to open issues and pull requests. All contributions are welcome!

