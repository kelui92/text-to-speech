# TESTING.md — Testing Strategy

## Scope

Unit tests only for v1.

## Coverage Threshold

**80% minimum** across both frontend and backend.

## Tools

| Layer | Tool |
|-------|------|
| Python backend | `pytest` + `pytest-cov` + `pytest-asyncio` |
| Next.js frontend | `Jest` + `React Testing Library` |
| Mocking (backend) | `unittest.mock` / `pytest-mock` |
| Mocking (frontend) | `jest.fn()` / `msw` (Mock Service Worker) |

## Must-Never-Ship Without Tests

- **Industry prompt selection** — logic that maps industry → system prompt must be fully tested
- **OpenAI service wrappers** — STT, TTS, and chat service functions (mocked API calls)
- **API route handlers** — request validation and error handling for `/api/transcribe`, `/api/chat`, `/api/speak`

## Test File Locations

- Backend: `backend/tests/`
- Frontend: co-located with components (`__tests__/` folders) or `frontend/src/__tests__/`

## Running Tests

```bash
# Backend
cd backend && pytest --cov=src --cov-report=term-missing

# Frontend
cd frontend && npm test
```
