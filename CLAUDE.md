# CLAUDE.md

## Project Kickoff

At the start of a **new project** (when `docs/` does not exist or any of the 4 files below are missing), do not write any code. Instead, build the missing documents interactively with the user — one file at a time, asking questions and writing the answers into each file before moving to the next.

**The 4 required project documents:**
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/TESTING.md`
- `docs/AI_RULES.md`

### Build order and questions to ask:

**1. PRD.md** — Ask:
- What does this product do in one sentence?
- Who are the users?
- What are the core features for v1?
- What is explicitly out of scope?

**2. ARCHITECTURE.md** — Ask:
- What is the tech stack (language, framework, database)?
- How is the project structured (monolith, services, monorepo)?
- Are there any hard constraints or non-negotiables?

**3. TESTING.md** — Ask:
- What needs to be tested (unit, integration, e2e)?
- What is the acceptable coverage threshold?
- What testing libraries/tools are in use?
- Are there any areas that must never ship without a test?

**4. AI_RULES.md** — Ask:
- Are there patterns or libraries to always use or avoid?
- Any naming conventions or file structure rules?
- Anything I did on a previous project that you never want repeated?

Once all 4 files exist, confirm with the user and proceed to the first task.

---

## Every Session

Read all 4 docs silently before doing anything else. If a doc is missing mid-project, stop and build it before continuing.

---

## Behavioral Rules

- **Plan first:** For any task with 3+ steps, write a plan to `tasks/todo.md` and confirm with the user before writing code
- **Do exactly what was asked** — no extra features, refactors, or improvements beyond the request
- **Prefer editing existing files** over creating new ones
- **Never create docs** (md/README) unless explicitly asked or part of the 4 required files
- **Never commit** secrets, credentials, or `.env` files
- **Always run tests** before marking a task complete
- **Keep files under 500 lines** — split if needed
- **Update the docs** when decisions change — keep them the source of truth

---

## Workflow

1. Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/AI_RULES.md`
2. For any non-trivial task: write plan → confirm → implement
3. Track progress in `tasks/todo.md`
4. Mark items complete as you go
5. If something goes wrong, stop and re-plan — don't push through
