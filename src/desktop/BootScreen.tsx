import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const BOOT_DURATION_MS = 1600

interface BootScreenProps {
  onDone: () => void
}

export function BootScreen({ onDone }: BootScreenProps) {
  const [skippable, setSkippable] = useState(false)

  useEffect(() => {
    const skipTimer = window.setTimeout(() => setSkippable(true), 300)
    const doneTimer = window.setTimeout(onDone, BOOT_DURATION_MS)
    return () => {
      window.clearTimeout(skipTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      className="boot-screen"
      onClick={() => skippable && onDone()}
      role="button"
      tabIndex={0}
      aria-label="Skip boot screen"
    >
      <div className="boot-screen-content">
        <div className="boot-screen-title">{profile.name}</div>
        <div className="boot-screen-subtitle">Portfolio OS</div>
        <div className="boot-progress">
          <div className="boot-progress-bar" />
        </div>
        <div className="boot-screen-hint">Click to skip</div>
      </div>
    </div>
  )
}
