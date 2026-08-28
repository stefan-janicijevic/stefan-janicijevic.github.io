import { useEffect, useState } from 'react'
import { useWindowStore } from '../store/windowStore'

interface TaskbarProps {
  startOpen: boolean
  onToggleStart: () => void
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function Taskbar({ startOpen, onToggleStart }: TaskbarProps) {
  const windows = useWindowStore((s) => s.windows)
  const focusedId = useWindowStore((s) => s.focusedId)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const now = useClock()

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="taskbar">
      <button
        type="button"
        className={`taskbar-start-button${startOpen ? ' active' : ''}`}
        onClick={onToggleStart}
      >
        <span className="taskbar-icon" aria-hidden="true">🪟</span> Start
      </button>
      <div className="taskbar-windows">
        {windows.map((w) => {
          const isActive = w.id === focusedId && !w.minimized
          return (
            <button
              type="button"
              key={w.id}
              className={`taskbar-window-button${isActive ? ' active' : ''}`}
              onClick={() => {
                if (isActive) minimizeWindow(w.id)
                else focusWindow(w.id)
              }}
            >
              <span className="taskbar-icon" aria-hidden="true">{w.icon}</span> {w.title}
            </button>
          )
        })}
      </div>
      <div className="taskbar-clock">{time}</div>
    </div>
  )
}
