# Tasks

See [plan.md](./plan.md) for full detail on each milestone.

- [x] 1. Scaffold & cleanup — Vite React-TS app, install deps (`zustand`, `react-rnd`, `98.css`), remove placeholder content, commit
- [x] 2. Static desktop shell — `Desktop`, `DesktopIcon` grid, static `Taskbar`, background styling
- [x] 3. Window manager core — `windowStore` (zustand), `Window` (drag/resize/focus/minimize/maximize/close), wire icons + taskbar buttons
- [x] 4. Content windows — `data/*.ts` (placeholder content), `AboutWindow`, `SkillsWindow`, `ProjectsWindow`, `ResumeWindow`
- [x] 5. Terminal app — `TerminalWindow`, `commands.ts` registry, scrollback, starter commands
- [x] 6. Start menu — `StartMenu` wired to app registry (done alongside the desktop shell milestone)
- [x] 7. Responsiveness pass — mobile breakpoint (stacked icons, auto-maximized windows, disabled drag/resize; CSS landed with the desktop shell, verified separately on a 390x844 viewport with the Start menu, terminal, and window switching)
- [ ] 8. Polish — boot screen, optional sound effects, favicon, cursor, README rewrite
- [ ] 9. Deploy — `.github/workflows/deploy.yml`, `base: '/'`, enable Pages "GitHub Actions" source, push to `main`, verify live site

**Follow-up (not a build blocker):** swap placeholder content in `data/profile.ts`, `data/skills.ts`, `data/projects.ts`, and `public/assets/resume.pdf` for real content.
