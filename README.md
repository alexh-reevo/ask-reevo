# Agentic Chat States

A small Vite + React app showcasing the UI states an agentic chat moves
through, for the team to review. Built with **Tailwind CSS v4** and **Motion**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # type-checks then outputs to dist/
npm run preview  # preview the production build
```

## Deploy to Vercel

The app is a standard static Vite build, so Vercel detects everything
automatically — no config needed.

**Option A — dashboard:** push this repo to GitHub and "Import Project" at
[vercel.com/new](https://vercel.com/new). Vercel auto-fills:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # public production URL to share
```

## Components

Each lives in `src/components/` and is self-contained:

| Component         | State                                         |
| ----------------- | --------------------------------------------- |
| `UserPrompt`      | The user's submitted request                  |
| `ThinkingState`   | Agent reasoning (uses the loader placeholder)  |
| `ToolCallState`   | Running a tool — pending and resolved          |
| `ResponseState`   | Final answer, streaming and settled            |
| `AgentRow`        | Shared avatar + content scaffold              |
| `Loader`          | **Placeholder** — replace with your own loader |
