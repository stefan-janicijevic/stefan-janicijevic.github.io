import { APPS, APP_ORDER } from '../apps/registry'
import { useWindowStore } from '../store/windowStore'
import { profile } from '../data/profile'

interface StartMenuProps {
  onClose: () => void
}

export function StartMenu({ onClose }: StartMenuProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  return (
    <div className="start-menu">
      <div className="start-menu-banner" aria-hidden="true">
        <span>{profile.name}</span>
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
                <span aria-hidden="true">{app.icon}</span> {app.label}
              </button>
            </li>
          )
        })}
        <li className="start-menu-divider" role="separator" />
        <li>
          <button type="button" onClick={onClose}>
            <span aria-hidden="true">🔌</span> Shut Down...
          </button>
        </li>
      </ul>
    </div>
  )
}
