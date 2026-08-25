# Retro-OS Portfolio Site — Implementation Plan

## Context

The user wants a standalone personal portfolio site with a nostalgic Windows 98-style desktop OS aesthetic (windows, taskbar, Start menu, desktop icons, a bonus fake-terminal easter egg), covering About, Skills, Resume/Contact, and Projects. It will be hosted on GitHub Pages.

Repo discovery: `c:\Users\stefa\Documents\Portfolio\stefan-janicijevic.github.io` already exists as a git repo with remote `https://github.com/stefan-janicijevic/stefan-janicijevic.github.io.git` on branch `main`. It currently contains only a placeholder "under construction" page (plain `index.html` + `css/` + `images/`, 3 commits, clean working tree). This is a **root user-page repo**, which settles the Vite `base` question: `base: '/'` (no sub-path), and the deploy target is the `main`-branch-backed GitHub Pages site at `https://stefan-janicijevic.github.io`.

Plan: rebuild this existing repo in place (keep `.git` history/remote, replace the placeholder content) with a React + Vite retro-desktop app, deployed via GitHub Actions.

---

## 1. Repo & Project Setup

- **Repo**: reuse existing `stefan-janicijevic.github.io` (root user site → deployed at domain root, `base: '/'`). No project-page ambiguity to resolve since it's already a `<username>.github.io` repo.
- **Scaffold**: `npm create vite@latest . -- --template react-ts` run inside the existing repo folder (after moving/removing the old placeholder `index.html`, `css/`, `images/` — keep `README.md`, update it later).
- **Key deps**:
  - `react` ^18, `react-dom` ^18, `typescript` ^5, `vite` ^5
  - `zustand` ^4 — global window-manager state
  - `react-rnd` ^10 — drag + resize for windows
  - `98.css` (via npm) — base Win98 chrome, customized on top
  - `gh-pages` — not needed if using GitHub Actions deploy (see §7); skip as a dependency
- **Folder structure**:
  ```
  /
  ├─ .github/workflows/deploy.yml
  ├─ public/
  │  ├─ favicon.ico
  │  └─ assets/ (resume.pdf, screenshots, icons, boot sound, click sound)
  ├─ src/
  │  ├─ main.tsx
  │  ├─ App.tsx
  │  ├─ desktop/
  │  │  ├─ Desktop.tsx
  │  │  ├─ DesktopIcon.tsx
  │  │  ├─ Taskbar.tsx
  │  │  ├─ StartMenu.tsx
  │  │  └─ BootScreen.tsx
  │  ├─ windows/
  │  │  ├─ WindowManager.tsx
  │  │  ├─ Window.tsx
  │  │  ├─ apps/
  │  │  │  ├─ AboutWindow.tsx
  │  │  │  ├─ SkillsWindow.tsx
  │  │  │  ├─ ProjectsWindow.tsx
  │  │  │  ├─ ResumeWindow.tsx
  │  │  │  └─ TerminalWindow.tsx
  │  ├─ terminal/
  │  │  ├─ commands.ts
  │  │  └─ TerminalOutput.tsx
  │  ├─ store/
  │  │  └─ windowStore.ts  (zustand store)
  │  ├─ data/
  │  │  ├─ projects.ts
  │  │  ├─ skills.ts
  │  │  └─ profile.ts
  │  ├─ styles/
  │  │  ├─ win98-theme.css (overrides/extensions on 98.css)
  │  │  └─ responsive.css
  │  └─ types/
  │     └─ window.ts
  ├─ index.html
  ├─ vite.config.ts
  ├─ tsconfig.json
  └─ package.json
  ```

---

## 2. Component Architecture — Desktop / Window Manager

- **State**: `store/windowStore.ts` using **Zustand**. Shape: `{ windows: WindowState[], focusedId, openWindow(appId), closeWindow(id), minimizeWindow(id), toggleMaximize(id), focusWindow(id), updateWindowRect(id, rect) }`. `WindowState = { id, appId, title, icon, rect: {x,y,w,h}, zIndex, minimized, maximized }`. Zustand chosen over Context+useReducer because window drag/resize will dispatch high-frequency updates — Zustand avoids re-rendering the whole tree on every mousemove.
- **`Desktop.tsx`**: root layout — renders desktop icon grid, `<Taskbar/>`, `<StartMenu/>` (conditionally), and `<WindowManager/>`. Also owns the boot-screen gate (`BootScreen.tsx` shown once on load, ~1.5s, before desktop renders).
- **`DesktopIcon.tsx`**: icon + label, double-click (or single tap on touch) calls `openWindow(appId)`. Icons: My Computer→About, Projects folder, Skills, Resume, Terminal.exe/MS-DOS Prompt, (optional) Recycle Bin as a decorative dead icon.
- **`WindowManager.tsx`**: maps `windows` from the store to `<Window/>` instances, skipping minimized ones (rendered as taskbar buttons instead), passing z-index/focus.
- **`Window.tsx`**: wraps `react-rnd`'s `<Rnd>` for drag+resize, renders a Win98 title bar (icon, title, minimize/maximize/close buttons using 98.css button classes), and a content slot that renders the app component keyed by `appId` (a small switch/map from `appId` → component in `windows/apps/`). On mousedown anywhere in the window, calls `focusWindow(id)` to bring to front (highest zIndex) and toggle active title-bar styling.
- **`Taskbar.tsx`**: fixed bottom bar — Start button (opens `StartMenu`), a button per open window (bold/pressed-in if focused, click toggles minimize/restore+focus), and a clock (real `Date`, updates every 30s).
- **`StartMenu.tsx`**: simple popup list of the same apps as desktop icons, plus a "Shut Down..." novelty item (can trigger a fake CRT-off animation or just close, purely cosmetic).
- **Drag/resize**: `react-rnd` is worth the dependency — hand-rolling pointer-based drag+resize with resize handles, touch support, and bounds-checking is a lot of fiddly code for little differentiation; `react-rnd` is small, unstyled, and composes cleanly with the store (`onDragStop`/`onResizeStop` → `updateWindowRect`).

---

## 3. Terminal App

- **`windows/apps/TerminalWindow.tsx`**: renders scrollback (`TerminalOutput.tsx`, an array of `{type: 'input'|'output', text}` lines) + a single-line input pinned at bottom, styled as a classic MS-DOS/console (black bg, green or white monospace text, blinking block cursor). Local component state (`useState`) for history/current input — no need for global store here.
- **Command registry pattern** — `terminal/commands.ts` exports a `commands: Record<string, (args: string[]) => string | string[]>` map. Each handler returns text (or array of lines) to append to scrollback. Terminal component looks up `commands[cmd] ?? commands['unknown']`.
- **Starter commands**:
  - `help` — lists available commands
  - `about` — short bio (mirrors About window content)
  - `skills` — list of tech stack, pulled from `data/skills.ts`
  - `projects` / `ls projects` — lists project names from `data/projects.ts`, `cat projects/<name>` for one project's detail
  - `resume` / `open resume.pdf` — prints a line + triggers opening the Resume window (or a direct download link)
  - `contact` — email/LinkedIn/GitHub links as text
  - `whoami` — name/title one-liner
  - `clear` — clears scrollback
  - `sudo <anything>` — joke denial ("Nice try. Permission denied.")
  - `ls` (no args) — lists "files" (about.txt, skills.txt, projects/, resume.pdf, contact.txt)
  - `cat <file>` — generic file reader mapped to the same content as the named commands
  - `unknown` fallback — "'x' is not recognized as an internal or external command..." (authentic DOS error)
- Command execution can also call into the window store (e.g., `resume` command both prints text and calls `openWindow('resume')`) — pass `openWindow` into the command context so commands can trigger real UI actions, not just text.

---

## 4. Content / App Windows

- **`data/profile.ts`**: name, title/tagline, bio paragraphs, contact links (email, GitHub, LinkedIn).
- **`data/skills.ts`**: array of `{ category: string, items: string[] }` (e.g., Languages, Frameworks, Tools) — optionally with an icon per item.
- **`data/projects.ts`**: array of `{ id, title, description, tags: string[], links: {repo?, demo?}, screenshot: string }` — this is the single source of truth consumed by both `ProjectsWindow` and the terminal's `projects`/`cat` commands.
- **`AboutWindow.tsx`**: styled like Notepad (98.css `window` with a text-area look) rendering bio from `profile.ts`.
- **`SkillsWindow.tsx`**: renders `skills.ts` as grouped list/icon grid (98.css list-view or tree-view styling).
- **`ProjectsWindow.tsx`**: renders `projects.ts` as a folder/icon grid (double-click a project icon to expand detail — either inline expand or opens a nested "file" view within the same window) with tags, links, and screenshot thumbnail.
- **`ResumeWindow.tsx`**: embeds `public/assets/resume.pdf` via `<iframe>` (or `<embed>`) with a fallback "Download Resume" link (98.css button) plus contact icons/links from `profile.ts` at the bottom.

---

## 5. Styling Approach

- **Use `98.css` as the base**, layered with a custom `styles/win98-theme.css` for portfolio-specific tweaks (title-bar gradient colors, custom icon sizes, terminal styling, desktop background). Hand-rolling every beveled border/button/title-bar from scratch is a lot of pixel-perfect box-shadow work that 98.css already solves well and is MIT-licensed/lightweight (~14KB) — not worth reinventing. Custom CSS on top handles anything 98.css doesn't cover (desktop background pattern, taskbar clock, terminal color scheme, responsive rules).
- **Fonts**: `"MS Sans Serif", "Tahoma", "Segoe UI", sans-serif` stack (98.css ships a webfont-free approximation; can optionally self-host a "Perfect DOS VGA" or "MS Sans Serif" web font for extra authenticity in the terminal specifically).
- **Cursor**: default arrow is fine; optionally swap in a classic Windows arrow cursor image for extra flavor (low priority, `cursor: url(...)`).
- **Beveled chrome**: comes from 98.css button/window classes directly — no need to hand-write the `box-shadow` bevel technique unless customizing a component 98.css doesn't cover.

---

## 6. Responsiveness

- Breakpoint (e.g. `max-width: 768px`) triggers a **mobile mode**:
  - Desktop icon grid becomes a simple vertical stacked list (full-width rows with icon + label) instead of a free grid.
  - Windows **auto-maximize on open** (fill viewport minus taskbar) and `react-rnd` drag/resize handles are disabled (`disableDragging`, `enableResizing={false}`) below the breakpoint — read the breakpoint via a `useMediaQuery`-style hook (small custom hook, no extra dep needed) inside `Window.tsx`.
  - Taskbar stays but window-switcher buttons may need to scroll horizontally or collapse to icons-only.
  - Terminal input: ensure the on-screen keyboard doesn't cover the input (scroll input into view on focus).
- No separate mobile "site" — same components, CSS/behavior branches by breakpoint.

---

## 7. Deployment (GitHub Actions → GitHub Pages)

Root user-page repo, so `base: '/'` in `vite.config.ts` (default — no change needed there beyond confirming it's not overridden).

- `.github/workflows/deploy.yml`:
  - Trigger: `push` to `main`.
  - Steps: checkout → `actions/setup-node@v4` (Node 20) → `npm ci` → `npm run build` → `actions/upload-pages-artifact@v3` (path `dist`) → `actions/deploy-pages@v4` (separate `deploy` job with `needs: build`, `permissions: pages: write, id-token: write`, `environment: github-pages`).
- Repo settings: **Settings → Pages → Source: GitHub Actions** (one-time manual step, done by the user in the browser since it's a repo-settings change).
- This is preferred over the `gh-pages` npm package here: it's a root user-page repo already deploying from `main`'s Pages settings, so Actions-based deploy avoids maintaining a separate `gh-pages` branch and keeps `main` as the single source of truth.
- `vite.config.ts`: only needs `base: '/'` explicitly set (harmless default for a root site, but explicit avoids ever breaking this if the repo is later renamed).

---

## 8. Build Order / Milestones (also becomes the repo task checklist)

1. **Scaffold & cleanup** — Vite React-TS app in place of placeholder content; install deps (`zustand`, `react-rnd`, `98.css`); commit.
2. **Static desktop shell** — `Desktop.tsx`, `DesktopIcon.tsx` (non-functional grid), `Taskbar.tsx` (static), background styling via 98.css.
3. **Window manager core** — `windowStore.ts`, `Window.tsx` (drag/resize/focus/minimize/maximize/close working with a placeholder content div), wire `DesktopIcon` → `openWindow`, `Taskbar` buttons reflect open windows.
4. **Content windows** — `data/*.ts` populated with real (or clearly-marked placeholder) content; `AboutWindow`, `SkillsWindow`, `ProjectsWindow`, `ResumeWindow` built and wired into the app registry.
5. **Terminal app** — `TerminalWindow.tsx`, `commands.ts` registry, scrollback, starter command set from §3.
6. **Start menu** — `StartMenu.tsx` wired to same app registry.
7. **Responsiveness pass** — mobile breakpoint behavior from §6, test on narrow viewport.
8. **Polish** — boot screen, optional click/startup sound effects (small `.wav`/`.mp3` in `public/assets`, muted-by-default with a toggle since autoplay audio is often blocked/annoying), favicon, cursor, README rewrite.
9. **Deploy** — add `deploy.yml`, set `base: '/'`, enable Pages "GitHub Actions" source in repo settings, push to `main`, verify live at `https://stefan-janicijevic.github.io`.

**Content note**: `data/profile.ts`, `data/skills.ts`, and `data/projects.ts` will initially be populated with clearly-marked placeholder content; real bio/skills/project details/resume PDF are supplied by the user and swapped in as a follow-up pass (not a blocker to building the structure).

---

## Execution Approach

Once this plan is approved:
1. Write this plan to `plan.md` and a checklist to `TASKS.md` at the repo root (`stefan-janicijevic.github.io/`), mirroring the milestones in §8 as checkboxes.
2. Work through the milestones in order, checking off each item in `TASKS.md` as it's completed, committing incrementally.
3. Verify at the end by running the dev server locally (`npm run dev`) and clicking through: open/drag/resize/minimize/close each window, run terminal commands, test the mobile breakpoint via browser devtools, then verify the deployed GitHub Pages URL after push.
