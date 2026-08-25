# Tasks

See [plan.md](./plan.md) for full detail on each milestone.

- [x] 1. Scaffold & cleanup — Vite React-TS app, install deps (`zustand`, `react-rnd`, `98.css`), remove placeholder content, commit
- [ ] 2. Static desktop shell — `Desktop`, `DesktopIcon` grid, static `Taskbar`, background styling
- [ ] 3. Window manager core — `windowStore` (zustand), `Window` (drag/resize/focus/minimize/maximize/close), wire icons + taskbar buttons
- [ ] 4. Content windows — `data/*.ts` (placeholder content), `AboutWindow`, `SkillsWindow`, `ProjectsWindow`, `ResumeWindow`
- [ ] 5. Terminal app — `TerminalWindow`, `commands.ts` registry, scrollback, starter commands
- [ ] 6. Start menu — `StartMenu` wired to app registry
- [ ] 7. Responsiveness pass — mobile breakpoint (stacked icons, auto-maximized windows, disabled drag/resize)
- [ ] 8. Polish — boot screen, optional sound effects, favicon, cursor, README rewrite
- [ ] 9. Deploy — `.github/workflows/deploy.yml`, `base: '/'`, enable Pages "GitHub Actions" source, push to `main`, verify live site

**Follow-up (not a build blocker):** swap placeholder content in `data/profile.ts`, `data/skills.ts`, `data/projects.ts`, and `public/assets/resume.pdf` for real content.
