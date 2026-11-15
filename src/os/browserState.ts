import { HOME_PATH } from './routes';

export interface Tab {
  id: number;
  history: string[];
  /** Position in the history; back and forward move it. */
  index: number;
}

export interface BrowserState {
  tabs: Tab[];
  activeId: number;
  nextId: number;
}

export type BrowserAction =
  | { type: 'navigate'; path: string }
  | { type: 'openTab'; path: string }
  | { type: 'visit'; path: string }
  | { type: 'select'; id: number }
  | { type: 'close'; id: number }
  | { type: 'back' }
  | { type: 'forward' };

export const initialBrowser: BrowserState = {
  tabs: [{ id: 1, history: [HOME_PATH], index: 0 }],
  activeId: 1,
  nextId: 2,
};

export const currentPath = (tab: Tab) => tab.history[tab.index];

export const activeTab = (state: BrowserState) => state.tabs.find((tab) => tab.id === state.activeId) ?? state.tabs[0];

function updateActive(state: BrowserState, change: (tab: Tab) => Tab): BrowserState {
  return { ...state, tabs: state.tabs.map((tab) => (tab.id === state.activeId ? change(tab) : tab)) };
}

function navigate(state: BrowserState, path: string): BrowserState {
  return updateActive(state, (tab) =>
    currentPath(tab) === path
      ? tab
      : { ...tab, history: [...tab.history.slice(0, tab.index + 1), path], index: tab.index + 1 },
  );
}

export function browserReducer(state: BrowserState, action: BrowserAction): BrowserState {
  switch (action.type) {
    case 'navigate':
      return navigate(state, action.path);
    case 'openTab': {
      const existing = state.tabs.find((tab) => currentPath(tab) === action.path);
      if (existing) return { ...state, activeId: existing.id };
      const tab: Tab = { id: state.nextId, history: [action.path], index: 0 };
      return { tabs: [...state.tabs, tab], activeId: tab.id, nextId: state.nextId + 1 };
    }
    // From a desktop shortcut: reuse a tab already on that page, otherwise load it in the current one.
    case 'visit': {
      const existing = state.tabs.find((tab) => currentPath(tab) === action.path);
      return existing ? { ...state, activeId: existing.id } : navigate(state, action.path);
    }
    case 'select':
      return { ...state, activeId: action.id };
    case 'close': {
      if (state.tabs.length === 1) return state;
      const position = state.tabs.findIndex((tab) => tab.id === action.id);
      const tabs = state.tabs.filter((tab) => tab.id !== action.id);
      const activeId = state.activeId === action.id ? tabs[Math.max(0, position - 1)].id : state.activeId;
      return { ...state, tabs, activeId };
    }
    case 'back':
      return updateActive(state, (tab) => ({ ...tab, index: Math.max(0, tab.index - 1) }));
    case 'forward':
      return updateActive(state, (tab) => ({ ...tab, index: Math.min(tab.history.length - 1, tab.index + 1) }));
  }
}
