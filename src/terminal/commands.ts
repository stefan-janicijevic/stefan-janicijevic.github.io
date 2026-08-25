import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import { projects } from '../data/projects'
import type { AppId } from '../types/window'

export interface CommandContext {
  openWindow: (appId: AppId) => void
  clearScreen: () => void
}

export type CommandHandler = (args: string[], ctx: CommandContext) => string | string[] | void

const FILES = ['about.txt', 'skills.txt', 'contact.txt', 'resume.pdf', 'projects/']

function aboutText(): string[] {
  return profile.bio
}

function skillsText(): string[] {
  return skillGroups.map((g) => `${g.category}: ${g.items.join(', ')}`)
}

function contactText(): string[] {
  return [
    `Email:    ${profile.contact.email}`,
    `GitHub:   ${profile.contact.github}`,
    `LinkedIn: ${profile.contact.linkedin}`,
  ]
}

function projectText(id: string): string[] {
  const project = projects.find((p) => p.id === id || p.title.toLowerCase() === id.toLowerCase())
  if (!project) return [`cat: projects/${id}: No such file or directory`]
  return [
    project.title,
    project.description,
    `Tags: ${project.tags.join(', ')}`,
    ...(project.links.repo ? [`Repo: ${project.links.repo}`] : []),
    ...(project.links.demo ? [`Demo: ${project.links.demo}`] : []),
  ]
}

export const commands: Record<string, CommandHandler> = {
  help: () => [
    'Available commands:',
    '  help              show this list',
    '  whoami            who am I?',
    '  about             print about.txt',
    '  skills            list skills',
    '  projects          list projects',
    '  resume            open the resume window',
    '  contact           print contact info',
    '  ls [dir]          list files',
    '  cat <file>        print a file',
    '  clear             clear the screen',
  ],

  whoami: () => `${profile.name} — ${profile.title}`,

  about: () => aboutText(),

  skills: () => skillsText(),

  contact: () => contactText(),

  projects: () => [
    'Projects:',
    ...projects.map((p) => `  ${p.id} — ${p.title}`),
    "(try 'cat projects/<id>' for details)",
  ],

  resume: (_args, ctx) => {
    ctx.openWindow('resume')
    return 'Opening resume.pdf...'
  },

  ls: (args) => {
    if (args[0] === 'projects') {
      return projects.map((p) => p.id)
    }
    return FILES.join('  ')
  },

  cat: (args) => {
    const file = args[0]
    if (!file) return 'cat: missing file operand'
    if (file === 'about.txt') return aboutText()
    if (file === 'skills.txt') return skillsText()
    if (file === 'contact.txt') return contactText()
    if (file === 'resume.pdf') return "Binary file. Try 'resume' to open it."
    if (file.startsWith('projects/')) return projectText(file.slice('projects/'.length))
    return `cat: ${file}: No such file or directory`
  },

  clear: (_args, ctx) => {
    ctx.clearScreen()
  },

  sudo: () => 'Nice try. Permission denied.',

  unknown: (args) => `'${args[0] ?? ''}' is not recognized as an internal or external command.`,
}

export function runCommand(input: string, ctx: CommandContext): string[] {
  const trimmed = input.trim()
  if (!trimmed) return []
  const [cmd, ...args] = trimmed.split(/\s+/)
  const known = commands[cmd.toLowerCase()]
  const result = known ? known(args, ctx) : commands.unknown([cmd], ctx)
  if (result === undefined) return []
  return Array.isArray(result) ? result : [result]
}
