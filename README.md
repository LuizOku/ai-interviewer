# AI Interviewer

A Next.js application that simulates an AI-powered interview experience, allowing users to record and analyze their responses to interview questions.

## Demo

🚀 **[Live Demo](https://ai-interviewer-murex.vercel.app/)**

## Features

- Real-time voice recording
- AI-powered interview simulation
- Interview history tracking
- MongoDB database integration for storing interviews and audio files

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with GridFS for audio storage
- **AI Integration**: OpenAI API
- **Deployment**: Vercel

## Prerequisites

- Node.js 18.17 or later
- MongoDB database (local or cloud)
- OpenAI API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=your_base_url # e.g., http://localhost:3000 for development
```

For production deployment on Vercel, make sure to add these environment variables in your Vercel project settings.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-interviewer.git
   cd ai-interviewer
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up your environment variables:
   - Create a `.env` file
   - Fill in your OpenAI API key and MongoDB connection string
   - For local development, set `NEXT_PUBLIC_BASE_URL` to `http://localhost:3000`

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

This project uses MongoDB with GridFS for storing audio files. Follow these steps to set up your database:

1. Create a MongoDB database (local or cloud-based)
2. Update the `MONGODB_URI` in your `.env` file with your connection string
3. The application will automatically create the necessary collections and indexes

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── interviews/    # Interview-related endpoints
│   │   └── session/       # Session management endpoints
│   │   └── audio/         # Audio-related endpoints
│   ├── history/           # Interview history page
│   ├── interview/         # Interview flow page
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── gridfs.ts         # GridFS file handling
│   └── openai.ts         # OpenAI API integration
├── models/              # TypeScript interfaces
└── __tests__/          # Test files

```

## API Routes

- `/api/interviews` - CRUD operations for interviews
- `/api/audio/[id]` - Stream audio files from GridFS
- `/api/session` - Session management endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

