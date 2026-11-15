import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AvatarGuide from './AvatarGuide';
import { BrowserTabs, BrowserView } from './Browser';
import { activeTab, browserReducer, currentPath, initialBrowser } from './browserState';
import MailApp from './Mail';
import PreviewApp from './Preview';
import Window from './Window';
import { mascot, sections } from '../data/content';
import type { AppId } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { APPS, PAGES, parsePath, pathTitle } from './routes';
import { desktopReducer, focusedWindow, initialDesktop } from './windowManager';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 20_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const appById = (id: AppId) => APPS.find((app) => app.id === id)!;

interface Props {
  /** True once the camera has arrived at the laptop screen. */
  active: boolean;
  /** False when there is no 3D scene to step back into. */
  canExit: boolean;
  reducedMotion: boolean;
  onExit: () => void;
}

/** The laptop's desktop: menu bar, desktop icons, app windows, dock and the avatar guide. */
export default function LaptopOS({ active, canExit, reducedMotion, onExit }: Props) {
  const [desktop, dispatch] = useReducer(desktopReducer, initialDesktop);
  const [browser, dispatchBrowser] = useReducer(browserReducer, initialBrowser);
  const mobile = useMediaQuery('(max-width: 860px)');
  // The mascot keeps its welcome line until the visitor opens or navigates something themselves.
  const [toured, setToured] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  const now = useClock();
  const front = focusedWindow(desktop);
  const path = currentPath(activeTab(browser));

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      dispatch({ type: 'bounds', bounds: { w: entry.contentRect.width, h: entry.contentRect.height } }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The first time the laptop opens, the browser is already showing the About page.
  const measured = desktop.bounds.w > 0;
  const launched = useRef(false);
  useEffect(() => {
    if (!active || !measured || launched.current) return;
    launched.current = true;
    dispatch({ type: 'open', id: 'browser' });
  }, [active, measured]);

  const openApp = useCallback((id: AppId) => {
    setToured(true);
    dispatch({ type: 'open', id, size: appById(id).size });
  }, []);

  const navigate = useCallback((to: string) => {
    setToured(true);
    dispatchBrowser({ type: 'navigate', path: to });
  }, []);

  const openTab = useCallback((to: string) => {
    setToured(true);
    dispatchBrowser({ type: 'openTab', path: to });
  }, []);

  const visit = (to: string) => {
    dispatchBrowser({ type: 'visit', path: to });
    openApp('browser');
  };

  const frontId = front?.id;
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (frontId) dispatch({ type: 'close', id: frontId });
      else if (canExit) onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, canExit, onExit, frontId]);

  const page = parsePath(path);
  const frontLine = !front ? mascot.welcome : front.id === 'browser' ? mascot[page.project ? 'project' : page.page] : mascot[front.id];
  const guideText = toured ? frontLine : mascot.welcome;

  const shortcuts = [
    ...PAGES.map((item) => ({ key: item.id, label: item.label, icon: item.icon, color: item.color, open: () => visit(item.path) })),
    ...APPS.filter((app) => app.id !== 'browser').map((app) => ({
      key: app.id,
      label: app.id === 'preview' ? sections.preview.shortcutLabel : app.label,
      icon: app.icon,
      color: app.color,
      open: () => openApp(app.id),
    })),
  ];

  return (
    <div
      className={`os ${active ? 'is-active' : ''} ${mobile ? 'os--mobile' : ''}`}
      aria-hidden={!active}
      inert={active ? undefined : ''}
    >
      <div className="os__wallpaper" />

      <div className="os__bar">
        <div className="os__bar-left">
          <span className="os__brand">
            <span className="os__brand-dot" /> {sections.desktop.name}
          </span>
          <span className="os__bar-app">{front ? appById(front.id).label : sections.desktop.idleLabel}</span>
        </div>
        <div className="os__bar-right">
          <time className="os__clock">
            {now.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
            {'  '}
            {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </time>
          {canExit && (
            <button type="button" className="os__exit" onClick={onExit}>
              <ArrowLeft size={14} /> {sections.desktop.exitLabel}
            </button>
          )}
        </div>
      </div>

      <div className="os__desktop">
        <div ref={area} className="os__windows">
          <ul className="desktop-icons" aria-label={sections.desktop.iconsLabel}>
            {shortcuts.map((item) => (
              <li key={item.key}>
                <button type="button" className="desktop-icon" onClick={item.open}>
                  <span className="app-icon" style={{ background: item.color }}>
                    <item.icon size={22} strokeWidth={2.2} />
                  </span>
                  <span className="desktop-icon__label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {desktop.windows.map((win) => {
            const app = appById(win.id);
            const isBrowser = win.id === 'browser';
            return (
              <Window
                key={win.id}
                win={win}
                focused={front?.id === win.id}
                mobile={mobile}
                bounds={desktop.bounds}
                title={isBrowser ? `${pathTitle(path)}, ${app.label}` : app.label}
                icon={app.icon}
                color={app.color}
                bar={isBrowser ? <BrowserTabs state={browser} dispatch={dispatchBrowser} /> : undefined}
                dispatch={dispatch}
              >
                {isBrowser && (
                  <BrowserView state={browser} dispatch={dispatchBrowser} navigate={navigate} openTab={openTab} />
                )}
                {win.id === 'mail' && <MailApp />}
                {win.id === 'preview' && <PreviewApp />}
              </Window>
            );
          })}
        </div>

        {active && <AvatarGuide text={guideText} greeting={!toured} reducedMotion={reducedMotion} />}
      </div>

      <nav className="dock" aria-label={sections.desktop.dockLabel}>
        {APPS.map((app) => {
          const win = desktop.windows.find((item) => item.id === app.id);
          return (
            <button
              key={app.id}
              type="button"
              className={`dock__app ${win ? 'is-open' : ''}`}
              onClick={() => openApp(app.id)}
              aria-label={win ? `${app.label}, ${sections.desktop.openState}` : app.label}
              aria-current={front?.id === app.id ? 'page' : undefined}
            >
              <span className="app-icon" style={{ background: app.color }}>
                <app.icon size={22} strokeWidth={2.2} />
              </span>
              <span className="dock__tooltip">{app.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
