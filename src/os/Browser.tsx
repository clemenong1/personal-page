import { memo } from 'react';
import type { Dispatch } from 'react';
import { ChevronLeft, ChevronRight, Lock, X } from 'lucide-react';
import { sections } from '../data/content';
import { activeTab, currentPath } from './browserState';
import type { BrowserAction, BrowserState } from './browserState';
import { AboutPage, ExperiencePage, ProjectsPage, SkillsPage } from './pages';
import { PAGES, displayUrl, parsePath, pathTitle } from './routes';
import type { PageProps } from './routes';

interface Props {
  state: BrowserState;
  dispatch: Dispatch<BrowserAction>;
}

/** The tab strip, shown in the browser window's title bar. */
export function BrowserTabs({ state, dispatch }: Props) {
  const copy = sections.browser;
  return (
    <div className="tabs" role="tablist" aria-label={copy.tabsLabel}>
      {state.tabs.map((tab) => {
        const path = currentPath(tab);
        const page = PAGES.find((item) => item.id === parsePath(path).page)!;
        const selected = tab.id === state.activeId;
        const title = pathTitle(path);
        return (
          <div key={tab.id} className={`tab ${selected ? 'is-active' : ''}`}>
            <button
              type="button"
              role="tab"
              aria-selected={selected}
              className="tab__select"
              onClick={() => dispatch({ type: 'select', id: tab.id })}
            >
              <page.icon size={13} style={{ color: page.color }} />
              <span className="tab__title">{title}</span>
            </button>
            {state.tabs.length > 1 && (
              <button
                type="button"
                className="tab__close"
                aria-label={`${copy.closeTabLabel}: ${title}`}
                onClick={() => dispatch({ type: 'close', id: tab.id })}
              >
                <X size={11} strokeWidth={3} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

const Page = memo(function Page(props: PageProps) {
  const { page } = parsePath(props.path);
  switch (page) {
    case 'about':
      return <AboutPage />;
    case 'experience':
      return <ExperiencePage {...props} />;
    case 'projects':
      return <ProjectsPage {...props} />;
    case 'skills':
      return <SkillsPage />;
  }
});

interface ViewProps extends Props {
  navigate: (path: string) => void;
  openTab: (path: string) => void;
}

/** Toolbar, favourites bar and the page itself. */
export function BrowserView({ state, dispatch, navigate, openTab }: ViewProps) {
  const copy = sections.browser;
  const tab = activeTab(state);
  const path = currentPath(tab);
  const { page } = parsePath(path);

  return (
    <div className="browser">
      <div className="browser__toolbar">
        <button
          type="button"
          className="browser__nav"
          aria-label={copy.backLabel}
          disabled={tab.index === 0}
          onClick={() => dispatch({ type: 'back' })}
        >
          <ChevronLeft size={17} />
        </button>
        <button
          type="button"
          className="browser__nav"
          aria-label={copy.forwardLabel}
          disabled={tab.index === tab.history.length - 1}
          onClick={() => dispatch({ type: 'forward' })}
        >
          <ChevronRight size={17} />
        </button>
        <div className="browser__address" role="status" aria-label={copy.addressLabel}>
          <Lock size={11} aria-hidden="true" />
          <span>{displayUrl(path)}</span>
        </div>
      </div>
      <nav className="browser__favourites" aria-label={copy.favouritesLabel}>
        {PAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            className="browser__favourite"
            aria-current={item.id === page ? 'page' : undefined}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={13} style={{ color: item.color }} /> {item.label}
          </button>
        ))}
      </nav>
      <div key={`${tab.id}:${path}`} className="window__body" role="tabpanel" aria-label={pathTitle(path)}>
        <Page path={path} navigate={navigate} openTab={openTab} />
      </div>
    </div>
  );
}
