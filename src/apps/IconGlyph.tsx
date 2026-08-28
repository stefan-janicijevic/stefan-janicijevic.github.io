interface IconGlyphProps {
  icon: string
  className?: string
}

export function IconGlyph({ icon, className }: IconGlyphProps) {
  if (icon.startsWith('/')) {
    return <img src={icon} alt="" aria-hidden="true" className={`icon-image ${className ?? ''}`.trim()} />
  }
  return (
    <span className={className} aria-hidden="true">
      {icon}
    </span>
  )
}
