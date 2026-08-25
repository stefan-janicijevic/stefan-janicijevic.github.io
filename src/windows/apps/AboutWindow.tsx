import { profile } from '../../data/profile'

export function AboutWindow() {
  return (
    <div className="notepad-body">
      {profile.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )
}
