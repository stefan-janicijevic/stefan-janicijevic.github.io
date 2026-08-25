import { useState } from 'react'
import { projects } from '../../data/projects'

export function ProjectsWindow() {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id ?? null)

  return (
    <div className="projects-body">
      <div className="projects-grid">
        {projects.map((project) => (
          <button
            type="button"
            key={project.id}
            className={`project-tile${expandedId === project.id ? ' selected' : ''}`}
            onClick={() => setExpandedId(project.id)}
          >
            <span className="project-tile-glyph" aria-hidden="true">
              📁
            </span>
            <span className="project-tile-label">{project.title}</span>
          </button>
        ))}
      </div>

      {projects
        .filter((p) => p.id === expandedId)
        .map((project) => (
          <fieldset key={project.id} className="project-detail">
            <legend>{project.title}</legend>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer">
                  Repository
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </fieldset>
        ))}
    </div>
  )
}
