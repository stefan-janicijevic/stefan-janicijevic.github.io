# Tasks

See [plan.md](./plan.md) for full detail on each milestone.

- [x] 1. Scaffold & cleanup — Vite React-TS app, install deps (`zustand`, `react-rnd`, `98.css`), remove placeholder content, commit
- [x] 2. Static desktop shell — `Desktop`, `DesktopIcon` grid, static `Taskbar`, background styling
- [x] 3. Window manager core — `windowStore` (zustand), `Window` (drag/resize/focus/minimize/maximize/close), wire icons + taskbar buttons
- [x] 4. Content windows — `data/*.ts` (placeholder content), `AboutWindow`, `SkillsWindow`, `ProjectsWindow`, `ResumeWindow`
- [x] 5. Terminal app — `TerminalWindow`, `commands.ts` registry, scrollback, starter commands
- [x] 6. Start menu — `StartMenu` wired to app registry (done alongside the desktop shell milestone)
- [x] 7. Responsiveness pass — mobile breakpoint (stacked icons, auto-maximized windows, disabled drag/resize; CSS landed with the desktop shell, verified separately on a 390x844 viewport with the Start menu, terminal, and window switching)
- [x] 8. Polish — boot screen, favicon, README rewrite (sound effects and a custom cursor image were left out — no legitimate source asset for either, and both were marked optional/low-priority in plan.md)
- [ ] 9. Deploy — workflow committed and pushed to `main`; **remaining manual step**: go to Settings → Pages → Source and select "GitHub Actions" on github.com, then verify the live site at https://stefan-janicijevic.github.io

**Follow-up (not a build blocker):** swap placeholder content in `data/profile.ts`, `data/skills.ts`, `data/projects.ts`, and `public/assets/resume.pdf` for real content.
