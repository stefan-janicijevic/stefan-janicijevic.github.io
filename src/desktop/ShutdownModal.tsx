import { useEffect, useRef, useState } from 'react'

interface ShutdownModalProps {
  onClose: () => void
}

const MODAL_WIDTH = 300
const MODAL_HEIGHT = 150
const PROXIMITY = 90
const MARGIN = 12
const TASKBAR_HEIGHT = 32

function randomFarPosition(mouseX: number, mouseY: number) {
  const maxX = Math.max(MARGIN, window.innerWidth - MODAL_WIDTH - MARGIN)
  const maxY = Math.max(MARGIN, window.innerHeight - MODAL_HEIGHT - MARGIN - TASKBAR_HEIGHT)

  let best = { x: MARGIN, y: MARGIN }
  let bestDist = -1
  for (let i = 0; i < 10; i++) {
    const x = MARGIN + Math.random() * (maxX - MARGIN)
    const y = MARGIN + Math.random() * (maxY - MARGIN)
    const dist = Math.hypot(x + MODAL_WIDTH / 2 - mouseX, y + MODAL_HEIGHT / 2 - mouseY)
    if (dist > bestDist) {
      bestDist = dist
      best = { x, y }
    }
  }
  return best
}

const TAUNTS = [
  'Are you sure you want to shut down the computer?',
  "It really doesn't want to shut down.",
  'Nice try.',
  "You'll never catch it.",
  'This button has trust issues.',
]

export function ShutdownModal({ onClose }: ShutdownModalProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState(() => ({
    x: Math.max(MARGIN, window.innerWidth / 2 - MODAL_WIDTH / 2),
    y: Math.max(MARGIN, window.innerHeight / 2 - MODAL_HEIGHT / 2),
  }))
  const [dodges, setDodges] = useState(0)

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const btn = buttonRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < PROXIMITY) {
        setPosition(randomFarPosition(e.clientX, e.clientY))
        setDodges((d) => d + 1)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  function dodgeRandomly() {
    setPosition(randomFarPosition(-9999, -9999))
    setDodges((d) => d + 1)
  }

  const message = TAUNTS[Math.min(dodges, TAUNTS.length - 1)]

  return (
    <div
      className="window shutdown-modal"
      style={{ left: position.x, top: position.y, width: MODAL_WIDTH }}
      role="dialog"
      aria-label="Shut Down Windows"
    >
      <div className="title-bar">
        <div className="title-bar-text">Shut Down Windows</div>
      </div>
      <div className="window-body shutdown-modal-body">
        <p>{message}</p>
        <div className="shutdown-modal-actions">
          <button
            type="button"
            ref={buttonRef}
            onClick={dodgeRandomly}
            onFocus={dodgeRandomly}
          >
            Shut Down
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
