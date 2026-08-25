export type AppId = 'about' | 'skills' | 'projects' | 'resume' | 'terminal'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowInstance {
  id: string
  appId: AppId
  title: string
  icon: string
  rect: Rect
  zIndex: number
  minimized: boolean
  maximized: boolean
  prevRect: Rect | null
}
