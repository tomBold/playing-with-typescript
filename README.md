# playing-with-typescript

[![Tests](https://github.com/tomBold/playing-with-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/tomBold/playing-with-typescript/actions/workflows/ci.yml)

A full-stack TypeScript playground — Express API backend + React frontend built with Vite.

## Stack

| Layer | Tech |
|---|---|
| API | Node.js, Express 5, TypeScript |
| Frontend | React 19, Vite 8, TypeScript |
| Dev | ts-node, nodemon, concurrently |
| Logging | pino (JSON in prod, pretty in dev) |
| Testing | Vitest, Supertest, Testing Library |

## Getting started

```bash
npm install
npm run dev
```

Frontend → http://localhost:5173  
API → http://localhost:3000

## API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/hello` | Plain-text greeting |
| GET | `/api/health` | JSON health check with server time |
| GET | `/api/message` | JSON message from the backend |
| POST | `/api/echo` | Echoes the request JSON body back |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts API + frontend together |
| `npm run dev:server` | API only (nodemon + ts-node) |
| `npm run dev:web` | Frontend only (Vite) |
| `npm run build` | Compiles TypeScript + builds client |
| `npm start` | Runs the compiled production build |
| `npm run debug` | API with Node inspector on port 9229 |
| `npm test` | Backend tests (Vitest + Supertest) |
| `npm run test:all` | Backend + frontend tests |
| `npm test --prefix client` | Frontend tests (Vitest + Testing Library) |
