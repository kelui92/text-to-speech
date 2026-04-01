# PRD.md — Product Requirements Document

## Product Summary

A voice-first web application that conducts AI-driven screening conversations with experts, asking intelligent follow-up questions via speech, tailored to the user's industry.

## Users

**Experts** — subject-matter professionals being screened or interviewed across various industries.

## Core Features (v1)

- **Speech input**: User speaks; app transcribes speech to text
- **AI-driven questioning**: Bot asks an opening question and generates contextual follow-up questions based on user responses
- **Text-to-speech responses**: Bot responses are spoken aloud to the user
- **Industry selection**: User selects their industry at the start; the bot adapts its question set and domain knowledge accordingly
- **Supported industries**: Multiple (e.g., finance, healthcare, technology, legal, engineering — exact list TBD)
- **Single conversation flow**: No accounts, no login, no persistent session history — each session is stateless

## Out of Scope (v1)

Nothing is explicitly out of scope — keep scope minimal and ship the core loop first.
