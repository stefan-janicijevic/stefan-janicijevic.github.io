import { useRef, useState } from 'react'
import { useWindowStore } from '../../store/windowStore'
import { runCommand } from '../../terminal/commands'
import { TerminalOutput, type TerminalLine } from '../../terminal/TerminalOutput'

const BANNER: TerminalLine[] = [
  { type: 'output', text: "Portfolio Terminal [Version 1.0]" },
  { type: 'output', text: "Type 'help' to see available commands." },
  { type: 'output', text: '' },
]

export function TerminalWindow() {
  const [lines, setLines] = useState<TerminalLine[]>(BANNER)
  const [input, setInput] = useState('')
  const openWindow = useWindowStore((s) => s.openWindow)
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    })
  }

  function submit() {
    const command = input
    setInput('')
    if (!command.trim()) return

    const output = runCommand(command, {
      openWindow,
      clearScreen: () => setLines([]),
    })

    setLines((prev) => {
      if (command.trim().toLowerCase() === 'clear') return []
      return [
        ...prev,
        { type: 'input', text: command },
        ...output.map((text): TerminalLine => ({ type: 'output', text })),
      ]
    })
    scrollToBottom()
  }

  return (
    <div
      className="terminal-body"
      onClick={() => document.getElementById('terminal-input')?.focus()}
      ref={scrollRef}
    >
      <TerminalOutput lines={lines} />
      <div className="terminal-line terminal-line-input">
        <span className="terminal-prompt">C:\&gt;</span>
        <input
          id="terminal-input"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
