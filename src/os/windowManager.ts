import type { AppId } from '../data/content';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Bounds {
  w: number;
  h: number;
}

export interface WindowState {
  id: AppId;
  rect: Rect;
  z: number;
  minimized: boolean;
  zoomed: boolean;
}

export interface DesktopState {
  windows: WindowState[];
  /** Highest z handed out so far. */
  top: number;
  /** Size of the area windows live in, between the menu bar and the dock. */
  bounds: Bounds;
}

export type DesktopAction =
  | { type: 'open'; id: AppId; size?: Bounds }
  | { type: 'close'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'zoom'; id: AppId }
  | { type: 'rect'; id: AppId; rect: Rect }
  | { type: 'bounds'; bounds: Bounds };

export type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const MIN_WIDTH = 380;
export const MIN_HEIGHT = 280;
/** Space kept clear on the right for the mascot when the screen is wide enough. */
const GUIDE_WIDTH = 270;
const GUIDE_BREAKPOINT = 1100;
/** Space kept clear on the left for the desktop icons. */
const ICONS_WIDTH = 104;
const CASCADE = 26;

export const initialDesktop: DesktopState = { windows: [], top: 0, bounds: { w: 0, h: 0 } };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

/** Fits a window inside the desktop: never larger than it, never hanging off an edge. */
export function clampRect(rect: Rect, bounds: Bounds): Rect {
  const w = clamp(rect.w, Math.min(MIN_WIDTH, bounds.w), bounds.w);
  const h = clamp(rect.h, Math.min(MIN_HEIGHT, bounds.h), bounds.h);
  return { w, h, x: clamp(rect.x, 0, bounds.w - w), y: clamp(rect.y, 0, bounds.h - h) };
}

export function moveRect(start: Rect, dx: number, dy: number, bounds: Bounds): Rect {
  return clampRect({ ...start, x: start.x + dx, y: start.y + dy }, bounds);
}

export function resizeRect(start: Rect, edge: ResizeEdge, dx: number, dy: number, bounds: Bounds): Rect {
  let { x, y, w, h } = start;
  if (edge.includes('e')) w = clamp(start.w + dx, MIN_WIDTH, bounds.w - start.x);
  if (edge.includes('s')) h = clamp(start.h + dy, MIN_HEIGHT, bounds.h - start.y);
  if (edge.includes('w')) {
    x = clamp(start.x + dx, 0, start.x + start.w - MIN_WIDTH);
    w = start.x + start.w - x;
  }
  if (edge.includes('n')) {
    y = clamp(start.y + dy, 0, start.y + start.h - MIN_HEIGHT);
    h = start.y + start.h - y;
  }
  return clampRect({ x, y, w, h }, bounds);
}

const guideSpace = (bounds: Bounds) => (bounds.w > GUIDE_BREAKPOINT ? GUIDE_WIDTH : 0);

/** A zoomed window fills the desktop, stopping short of the mascot. */
export function zoomedRect(bounds: Bounds): Rect {
  return { x: 0, y: 0, w: bounds.w - guideSpace(bounds), h: bounds.h };
}

function defaultRect(bounds: Bounds, openCount: number, size: Bounds = { w: 1040, h: 700 }): Rect {
  const left = bounds.w > GUIDE_BREAKPOINT ? ICONS_WIDTH : 0;
  const free = bounds.w - left - guideSpace(bounds);
  const w = Math.min(size.w, free - 24);
  const h = Math.min(size.h, bounds.h - 28);
  const step = (openCount % 5) * CASCADE;
  return clampRect({ w, h, x: left + (free - w) / 2 + step, y: 12 + step }, bounds);
}

/** The window in front: the highest one that is not minimised. */
export function focusedWindow(state: DesktopState): WindowState | undefined {
  return state.windows.reduce<WindowState | undefined>(
    (front, win) => (!win.minimized && (!front || win.z > front.z) ? win : front),
    undefined,
  );
}

function update(state: DesktopState, id: AppId, change: (win: WindowState) => WindowState): DesktopState {
  return { ...state, windows: state.windows.map((win) => (win.id === id ? change(win) : win)) };
}

export function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'open': {
      const { id } = action;
      const top = state.top + 1;
      if (state.windows.some((win) => win.id === id)) {
        return { ...update(state, id, (win) => ({ ...win, minimized: false, z: top })), top };
      }
      const visible = state.windows.filter((win) => !win.minimized).length;
      const created: WindowState = {
        id,
        rect: defaultRect(state.bounds, visible, action.size),
        z: top,
        minimized: false,
        zoomed: false,
      };
      return { ...state, top, windows: [...state.windows, created] };
    }
    case 'close':
      return { ...state, windows: state.windows.filter((win) => win.id !== action.id) };
    case 'focus': {
      if (focusedWindow(state)?.id === action.id) return state;
      const top = state.top + 1;
      return { ...update(state, action.id, (win) => ({ ...win, minimized: false, z: top })), top };
    }
    case 'minimize':
      return update(state, action.id, (win) => ({ ...win, minimized: true }));
    case 'zoom':
      return update(state, action.id, (win) => ({ ...win, zoomed: !win.zoomed }));
    case 'rect':
      return update(state, action.id, (win) => ({ ...win, rect: action.rect }));
    case 'bounds':
      if (action.bounds.w === state.bounds.w && action.bounds.h === state.bounds.h) return state;
      return {
        ...state,
        bounds: action.bounds,
        windows: state.windows.map((win) => ({ ...win, rect: clampRect(win.rect, action.bounds) })),
      };
  }
}
