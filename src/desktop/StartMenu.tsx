import { APPS, APP_ORDER } from '../apps/registry'
import { useWindowStore } from '../store/windowStore'
import { profile } from '../data/profile'

interface StartMenuProps {
  onClose: () => void
  onShutdown: () => void
}

export function StartMenu({ onClose, onShutdown }: StartMenuProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  return (
    <div className="start-menu">
      <div className="start-menu-banner" aria-hidden="true">
        <span>{profile.nickname}</span>
      </div>
      <ul className="start-menu-items">
        {APP_ORDER.map((appId) => {
          const app = APPS[appId]
          return (
            <li key={appId}>
              <button
                type="button"
                onClick={() => {
                  openWindow(appId)
                  onClose()
                }}
              >
                <span className="start-menu-icon" aria-hidden="true">{app.icon}</span> {app.label}
              </button>
            </li>
          )
        })}
        <li className="start-menu-divider" role="separator" />
        <li>
          <button
            type="button"
            onClick={() => {
              onShutdown()
              onClose()
            }}
          >
            <span className="start-menu-icon" aria-hidden="true">🔌</span> Shut Down...
          </button>
        </li>
      </ul>
    </div>
  )
}
