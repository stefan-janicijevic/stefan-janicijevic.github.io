import { useWindowStore } from '../store/windowStore'
import { Window } from './Window'

export function WindowManager() {
  const windows = useWindowStore((s) => s.windows)
  const focusedId = useWindowStore((s) => s.focusedId)

  return (
    <div className="window-manager">
      {windows.map((win) => (
        <Window key={win.id} win={win} isFocused={win.id === focusedId} />
      ))}
    </div>
  )
}
