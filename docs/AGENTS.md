# AI Coding Agent Instructions

Turn project documentation into operational instructions. Use the rules mechanism supported by your coding environment and keep these principles centralized.

## 1. Project Context
Project: VEERAN
Purpose: Luxury artisanal bag and lifestyle accessories web application featuring editorial catalog storytelling, interactive bag discovery, persistent shopping cart, conversational WhatsApp direct checkout, and a secure administrative catalog manager.
Primary Users: Design-conscious buyers seeking handcrafted goods, and store administrators managing inventory and settings.

## 2. Source of Truth
Before significant changes, inspect relevant documentation inside `/docs`:
- [PRD.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/PRD.md)
- [DESIGN_SYSTEM.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/DESIGN_SYSTEM.md)
- [ARCHITECTURE.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/ARCHITECTURE.md)
- [DATABASE.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/DATABASE.md)
- [SECURITY.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/SECURITY.md)
- [CODE_STYLE.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/CODE_STYLE.md)
- [TESTING.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/TESTING.md)
- [UX_FLOWS.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/UX_FLOWS.md)
- [API.md](file:///C:/Users/harsh%20kumar/.gemini/antigravity/scratch/veeran/docs/API.md)

Do not contradict these documents without first identifying and resolving the conflict.

## 3. General Rules
- Understand existing code before modifying it.
- Reuse existing components, services, and utilities.
- Follow the design system (Stone neutral scale, editorial typography, minimalist luxury feel).
- Follow the architecture (keep business logic inside `src/services/` and UI in `src/components/`).
- Follow storage conventions (`veeran_*` keys with safe parsing).
- Follow security requirements:
  - Never hardcode credentials or secrets.
  - Keep `.env` out of commits.
  - Enforce origin checks, payload caps, and whitelists on API middleware.
  - Validate and canvas-transcode all image uploads.
- Do not invent speculative business requirements.
- Avoid unnecessary external dependencies.
- Avoid unrelated changes to clean git diffs.

## 4. Planning
Before implementing a non-trivial task:
1. Inspect relevant documentation in `/docs`.
2. Inspect relevant code in `src/`.
3. Identify affected files.
4. Identify dependencies and breaking changes.
5. Identify storage/API modifications required.
6. Identify automated tests required.
7. Create a concise implementation plan.

## 5. Implementation
- Make focused, single-purpose changes.
- Reuse established patterns.
- Preserve existing application behavior.
- Avoid unnecessary rewrites.
- Keep code clean, readable, and maintainable.

## 6. Validation
After implementation:
1. Run automated unit tests: `npm test`
2. Run linter: `npm run lint`
3. Run the production build: `npm run build`
4. Review changed files against git diff.
5. Check for unintended side effects or leaked secrets.

## 7. Documentation
Update documentation when implementation changes:
- Product behavior or scope changes → `docs/PRD.md`
- Visual tokens or component guidelines → `docs/DESIGN_SYSTEM.md`
- Architecture or stack changes → `docs/ARCHITECTURE.md`
- Data schemas or storage keys → `docs/DATABASE.md`
- Security or authentication rules → `docs/SECURITY.md`
- Coding patterns or conventions → `docs/CODE_STYLE.md`
- Test scenarios or testing commands → `docs/TESTING.md`
- User or admin journeys → `docs/UX_FLOWS.md`
- API contracts or endpoints → `docs/API.md`

## 8. Conflict Handling
If requirements conflict:
Do not guess. Identify the exact contradiction between the request, codebase, and documentation, and seek user clarification before proceeding.

## 9. Completion Criteria
A task is complete only when:
- Requirements are satisfied.
- Automated tests pass cleanly (`npm test`).
- Production build succeeds (`npm run build`).
- Linter passes with 0 errors (`npm run lint`).
- No unintended files are changed or secrets committed.
- Security rules are fully respected.
- Documentation is kept synchronized.
