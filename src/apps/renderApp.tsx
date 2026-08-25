import type { AppId } from '../types/window'
import { AboutWindow } from '../windows/apps/AboutWindow'
import { SkillsWindow } from '../windows/apps/SkillsWindow'
import { ProjectsWindow } from '../windows/apps/ProjectsWindow'
import { ResumeWindow } from '../windows/apps/ResumeWindow'
import { TerminalWindow } from '../windows/apps/TerminalWindow'

export function renderApp(appId: AppId) {
  switch (appId) {
    case 'about':
      return <AboutWindow />
    case 'skills':
      return <SkillsWindow />
    case 'projects':
      return <ProjectsWindow />
    case 'resume':
      return <ResumeWindow />
    case 'terminal':
      return <TerminalWindow />
  }
}
