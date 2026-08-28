import { Rnd } from 'react-rnd'
import { useWindowStore } from '../store/windowStore'
import { useMediaQuery, MOBILE_BREAKPOINT } from '../hooks/useMediaQuery'
import type { WindowInstance } from '../types/window'
import { renderApp } from '../apps/renderApp'
import { IconGlyph } from '../apps/IconGlyph'

interface WindowProps {
  win: WindowInstance
  isFocused: boolean
}

const TASKBAR_HEIGHT = 32

export function Window({ win, isFocused }: WindowProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updateWindowRect = useWindowStore((s) => s.updateWindowRect)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const effectiveRect =
    win.maximized || isMobile
      ? {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - TASKBAR_HEIGHT,
        }
      : win.rect

  return (
    <Rnd
      size={{ width: effectiveRect.width, height: effectiveRect.height }}
      position={{ x: effectiveRect.x, y: effectiveRect.y }}
      style={{ zIndex: win.zIndex, display: win.minimized ? 'none' : 'block' }}
      minWidth={260}
      minHeight={180}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      disableDragging={win.maximized || isMobile}
      enableResizing={!win.maximized && !isMobile}
      onDragStop={(_e, d) => updateWindowRect(win.id, { ...win.rect, x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, position) =>
        updateWindowRect(win.id, {
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
      onMouseDown={() => !isFocused && focusWindow(win.id)}
    >
      <div className={`window retro-window${isFocused ? ' is-focused' : ''}`}>
        <div
          className={`title-bar window-titlebar${isFocused ? '' : ' inactive'}`}
          onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
        >
          <div className="title-bar-text">
            <IconGlyph icon={win.icon} className="title-bar-icon" /> {win.title}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={() => minimizeWindow(win.id)} />
            <button
              aria-label={win.maximized ? 'Restore' : 'Maximize'}
              onClick={() => !isMobile && toggleMaximize(win.id)}
              disabled={isMobile}
            />
            <button aria-label="Close" onClick={() => closeWindow(win.id)} />
          </div>
        </div>
        <div className="window-body retro-window-body">{renderApp(win.appId)}</div>
      </div>
    </Rnd>
  )
}
