import type { AppId, Rect } from '../types/window'

export interface AppDefinition {
  id: AppId
  title: string
  label: string
  icon: string
  defaultRect: Rect
}

// Icon glyphs are placeholders until real pixel-art icons are added (see TASKS.md polish step).
export const APPS: Record<AppId, AppDefinition> = {
  about: {
    id: 'about',
    title: 'About.txt - Notepad',
    label: 'About Me',
    icon: '📝',
    defaultRect: { x: 60, y: 40, width: 440, height: 380 },
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    label: 'Skills',
    icon: '🛠️',
    defaultRect: { x: 120, y: 80, width: 460, height: 420 },
  },
  projects: {
    id: 'projects',
    title: 'My Projects',
    label: 'My Projects',
    icon: '/icons/folder.png',
    defaultRect: { x: 180, y: 60, width: 560, height: 440 },
  },
  resume: {
    id: 'resume',
    title: 'Resume.pdf',
    label: 'Resume',
    icon: '📄',
    defaultRect: { x: 100, y: 100, width: 520, height: 520 },
  },
  terminal: {
    id: 'terminal',
    title: 'MS-DOS Prompt',
    label: 'Terminal.exe',
    icon: '🖥️',
    defaultRect: { x: 200, y: 140, width: 560, height: 360 },
  },
}

export const APP_ORDER: AppId[] = ['about', 'projects', 'skills', 'resume', 'terminal']
