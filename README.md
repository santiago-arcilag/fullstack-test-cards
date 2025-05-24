# Fullstack Test – Cards Checkout

Initial scaffold for the full-stack challenge based on the PDF instructions.

## Tech stack (per PDF requirements)

### Frontend
- React + TypeScript (Vite)
- Redux Toolkit + RTK Query
- Material UI (mobile-first responsive)
- Jest + React Testing Library (> 80 % coverage)

### Backend
- Node.js + NestJS (TypeScript)
- Hexagonal architecture (domain / application / infrastructure)
- PostgreSQL via Prisma ORM
- Jest (> 80 % coverage)
- Swagger / OpenAPI documentation

### CI/CD
- GitHub Actions – lint, test, build stages
- AWS deployment (CloudFront + S3 + ECS/Lambda + RDS) – to be added later

---

## Repository layout
```text
frontend/   # React SPA implementing 5-step checkout flow
backend/    # NestJS API
```

## Progress log
Commits will be pushed continuously as functionality is completed (feature branch → merge to `main`). 