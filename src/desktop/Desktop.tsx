import { useState } from 'react'
import { APPS, APP_ORDER } from '../apps/registry'
import { DesktopIcon } from './DesktopIcon'
import { Taskbar } from './Taskbar'
import { StartMenu } from './StartMenu'
import { BootScreen } from './BootScreen'
import { ShutdownModal } from './ShutdownModal'
import { WindowManager } from '../windows/WindowManager'

export function Desktop() {
  const [startOpen, setStartOpen] = useState(false)
  const [booted, setBooted] = useState(false)
  const [shutdownOpen, setShutdownOpen] = useState(false)

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />
  }

  return (
    <div className="desktop" onClick={() => startOpen && setStartOpen(false)}>
      <div className="desktop-icons">
        {APP_ORDER.map((appId) => (
          <DesktopIcon key={appId} app={APPS[appId]} />
        ))}
      </div>

      <WindowManager />

      {startOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StartMenu onClose={() => setStartOpen(false)} onShutdown={() => setShutdownOpen(true)} />
        </div>
      )}

      {shutdownOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <ShutdownModal onClose={() => setShutdownOpen(false)} />
        </div>
      )}

      <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen((v) => !v)} />
    </div>
  )
}
