// Placeholder content — replace with real projects before launch (see TASKS.md).
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  links: { repo?: string; demo?: string }
  screenshot?: string
}

export const projects: Project[] = [
  {
    id: 'project-one',
    title: 'Project One',
    description: '[Placeholder] A short description of what this project does and why it exists.',
    tags: ['React', 'TypeScript'],
    links: { repo: 'https://github.com/stefan-janicijevic' },
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description: '[Placeholder] A short description of what this project does and why it exists.',
    tags: ['Node.js', 'API'],
    links: { repo: 'https://github.com/stefan-janicijevic' },
  },
]
