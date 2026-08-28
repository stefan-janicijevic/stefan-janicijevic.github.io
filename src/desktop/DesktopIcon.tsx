import { useState } from 'react'
import { useWindowStore } from '../store/windowStore'
import { useMediaQuery, MOBILE_BREAKPOINT } from '../hooks/useMediaQuery'
import type { AppDefinition } from '../apps/registry'
import { IconGlyph } from '../apps/IconGlyph'

interface DesktopIconProps {
  app: AppDefinition
}

export function DesktopIcon({ app }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)
  const [selected, setSelected] = useState(false)

  return (
    <button
      type="button"
      className={`desktop-icon${selected ? ' selected' : ''}`}
      onClick={() => {
        setSelected(true)
        if (isMobile) openWindow(app.id)
      }}
      onDoubleClick={() => !isMobile && openWindow(app.id)}
      onBlur={() => setSelected(false)}
    >
      <IconGlyph icon={app.icon} className="desktop-icon-glyph" />
      <span className="desktop-icon-label">{app.label}</span>
    </button>
  )
}
