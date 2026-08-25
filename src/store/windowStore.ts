import { create } from 'zustand'
import { APPS } from '../apps/registry'
import type { AppId, Rect, WindowInstance } from '../types/window'

let nextId = 1

interface WindowStoreState {
  windows: WindowInstance[]
  focusedId: string | null
  openWindow: (appId: AppId) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowRect: (id: string, rect: Rect) => void
}

function topZIndex(windows: WindowInstance[]): number {
  return windows.reduce((max, w) => Math.max(max, w.zIndex), 0)
}

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  windows: [],
  focusedId: null,

  openWindow: (appId) => {
    const existing = get().windows.find((w) => w.appId === appId)
    if (existing) {
      const z = topZIndex(get().windows) + 1
      set((state) => ({
        windows: state.windows.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, zIndex: z } : w,
        ),
        focusedId: existing.id,
      }))
      return
    }

    const def = APPS[appId]
    const id = `${appId}-${nextId++}`
    const z = topZIndex(get().windows) + 1
    const instance: WindowInstance = {
      id,
      appId,
      title: def.title,
      icon: def.icon,
      rect: def.defaultRect,
      zIndex: z,
      minimized: false,
      maximized: false,
      prevRect: null,
    }
    set((state) => ({
      windows: [...state.windows, instance],
      focusedId: id,
    }))
  },

  closeWindow: (id) => {
    set((state) => {
      const windows = state.windows.filter((w) => w.id !== id)
      const focusedId =
        state.focusedId === id ? (windows.at(-1)?.id ?? null) : state.focusedId
      return { windows, focusedId }
    })
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      focusedId: state.focusedId === id ? null : state.focusedId,
    }))
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w
        if (w.maximized) {
          return { ...w, maximized: false, rect: w.prevRect ?? w.rect, prevRect: null }
        }
        return { ...w, maximized: true, prevRect: w.rect }
      }),
    }))
  },

  focusWindow: (id) => {
    const state = get()
    const target = state.windows.find((w) => w.id === id)
    if (!target) return
    const z = topZIndex(state.windows) + 1
    set({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: false, zIndex: z } : w,
      ),
      focusedId: id,
    })
  },

  updateWindowRect: (id, rect) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, rect } : w)),
    }))
  },
}))
