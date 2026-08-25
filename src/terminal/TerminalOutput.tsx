export interface TerminalLine {
  type: 'input' | 'output'
  text: string
}

interface TerminalOutputProps {
  lines: TerminalLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className={`terminal-line terminal-line-${line.type}`}>
          {line.type === 'input' ? <span className="terminal-prompt">C:\&gt;</span> : null}
          <span>{line.text}</span>
        </div>
      ))}
    </>
  )
}
