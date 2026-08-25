# stefan-janicijevic.github.io

A personal portfolio site styled as a Windows 98 desktop — draggable/resizable
windows, a Start menu, a taskbar, and a terminal easter egg — built with React,
TypeScript, and Vite. Hosted on GitHub Pages.

See [plan.md](./plan.md) for the design/architecture plan and [TASKS.md](./TASKS.md)
for build progress.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml` to
GitHub Pages (Settings → Pages → Source: GitHub Actions).

## Content

Placeholder bio, skills, and project content live in `src/data/*.ts`; a real
resume PDF and project screenshots go in `public/assets/`. Replace these
before treating the site as launch-ready — see the follow-up note in
[TASKS.md](./TASKS.md).
