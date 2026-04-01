# tasks/todo.md

## Build: Full App — Voice Screening Bot

### Infrastructure
- [x] Create docs (PRD, ARCHITECTURE, TESTING, AI_RULES)
- [x] Create directory structure
- [ ] Root .gitignore + .env.example

### Backend (FastAPI / Railway)
- [ ] requirements.txt + main.py
- [ ] Services: openai_stt, openai_tts, openai_chat
- [ ] Industry prompts: finance, healthcare, technology, legal, engineering
- [ ] Routers: /api/transcribe, /api/chat, /api/speak, /api/industries
- [ ] Unit tests (pytest)
- [ ] Dockerfile + railway.toml

### Frontend (Next.js / Vercel)
- [ ] package.json + config files
- [ ] Types + API client
- [ ] App layout + page
- [ ] Components: IndustrySelector, VoiceRecorder, ConversationUI, MessageBubble
- [ ] Unit tests (Jest + RTL)
- [ ] vercel.json

### Deploy
- [ ] Verify all env vars documented
- [ ] Verify Dockerfile builds
- [ ] Verify Next.js builds
