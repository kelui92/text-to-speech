# ARCHITECTURE.md — System Architecture

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (React) |
| Backend | Python (FastAPI) |
| AI / STT / TTS | OpenAI API (GPT-4o, Whisper, TTS) |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

## Project Structure

**Monorepo** — single repository with two top-level packages:

```
text-to-speech/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/
│   │   └── lib/       # API client, hooks
│   └── package.json
├── backend/           # Python FastAPI app
│   ├── src/
│   │   ├── routers/   # API route handlers
│   │   ├── services/  # OpenAI integrations (chat, stt, tts)
│   │   └── prompts/   # Industry-specific system prompts
│   ├── tests/
│   └── requirements.txt
├── docs/
└── tasks/
```

## Architecture Overview

```
User (browser)
  │
  ▼
Next.js Frontend (Vercel)
  │  - Records audio via MediaRecorder API
  │  - Sends audio blob to backend
  │  - Plays TTS audio response
  │
  ▼
FastAPI Backend (Railway)
  │  POST /api/transcribe  → Whisper STT
  │  POST /api/chat        → GPT-4o (industry-aware follow-up)
  │  POST /api/speak       → OpenAI TTS
  │
  ▼
OpenAI API
  ├── Whisper  (speech → text)
  ├── GPT-4o   (text → follow-up question)
  └── TTS      (text → speech audio)
```

## Key Design Decisions

- **Stateless sessions**: Conversation history passed from frontend on each request; no server-side state or database
- **Industry prompts**: Each industry has a dedicated system prompt in `backend/src/prompts/`; selected at session start
- **Single API key**: All OpenAI services (Whisper, GPT-4o, TTS) share one `OPENAI_API_KEY` env var
- **No database**: v1 is fully stateless; session context lives in frontend React state

## Hard Constraints

- Backend must expose a REST API (consumed by Next.js frontend)
- All secrets via environment variables — never hardcoded
- Frontend deployed to Vercel; backend deployed to Railway
