# AI_RULES.md — AI Coding Rules

## Core Rule

**Stick to one way of doing things.** Don't mix patterns, libraries, or styles. Consistency over cleverness.

## Libraries

- **Always use**: `httpx` for async HTTP in Python, `axios` for HTTP in Next.js
- **Never mix**: Don't use both `fetch` and `axios` in the frontend — pick one (`axios`)
- **Never mix**: Don't use both `requests` and `httpx` in the backend — use `httpx` only

## Naming Conventions

- Python: `snake_case` for files, functions, variables
- TypeScript/JS: `camelCase` for variables/functions, `PascalCase` for components
- API routes: kebab-case (e.g., `/api/get-response`)
- Environment variables: `SCREAMING_SNAKE_CASE`

## File Structure

- One responsibility per file — no god files
- Keep files under 500 lines; split if needed
- Industry prompts live in `backend/src/prompts/` — one file per industry

## Avoid

- Hardcoded strings (use constants or config)
- Inline styles in React — use CSS modules or Tailwind
- Any direct OpenAI SDK calls outside of `backend/src/services/` — all AI calls go through the service layer
- Mixing async/sync patterns in Python — async throughout
