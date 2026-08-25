import { profile } from '../../data/profile'

const RESUME_PATH = '/assets/resume.pdf'

export function ResumeWindow() {
  return (
    <div className="resume-body">
      <iframe
        title="Resume"
        src={RESUME_PATH}
        className="resume-frame"
      />
      <div className="resume-actions">
        <a href={RESUME_PATH} download className="resume-download-button">
          Download Resume (PDF)
        </a>
      </div>
      <fieldset className="resume-contact">
        <legend>Contact</legend>
        <ul className="tree-view">
          <li>
            <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          </li>
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </fieldset>
    </div>
  )
}
