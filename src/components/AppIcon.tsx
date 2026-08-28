interface AppIconProps {
  icon: string
  className?: string
}

// Some app icons are real image assets (e.g. `/assets/icons/folder.svg`);
// the rest are still emoji placeholders until pixel-art versions exist.
export function AppIcon({ icon, className }: AppIconProps) {
  if (icon.startsWith('/')) {
    return <img src={icon} alt="" className={className} aria-hidden="true" />
  }
  return (
    <span className={className} aria-hidden="true">
      {icon}
    </span>
  )
}
