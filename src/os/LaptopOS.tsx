import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import AvatarGuide from './AvatarGuide';
import { APPS, AppContent } from './apps';
import { intros } from '../data/intros';
import type { AppId } from '../data/intros';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 20_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

interface Props {
  /** True once the camera has arrived at the laptop screen. */
  active: boolean;
  /** False when there is no 3D scene to step back into. */
  canExit: boolean;
  reducedMotion: boolean;
  onExit: () => void;
}

/** The laptop's desktop: a launcher, one app window at a time, a dock and the avatar guide. */
export default function LaptopOS({ active, canExit, reducedMotion, onExit }: Props) {
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const now = useClock();
  const windowBody = useRef<HTMLDivElement>(null);
  const current = APPS.find((app) => app.id === openApp);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openApp) setOpenApp(null);
      else if (canExit) onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, canExit, onExit, openApp]);

  useEffect(() => {
    windowBody.current?.scrollTo({ top: 0 });
  }, [openApp]);

  return (
    <div className={`os ${active ? 'is-active' : ''}`} aria-hidden={!active} inert={active ? undefined : ''}>
      <div className="os__wallpaper" />

      <div className="os__bar">
        <div className="os__bar-left">
          <span className="os__brand">
            <span className="os__brand-dot" /> ClemenOS
          </span>
          <span className="os__bar-app">{current ? current.label : 'Desktop'}</span>
        </div>
        <div className="os__bar-right">
          <time className="os__clock">
            {now.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
            {'  '}
            {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </time>
          {canExit && (
            <button type="button" className="os__exit" onClick={onExit}>
              <ArrowLeft size={14} /> Back to space
            </button>
          )}
        </div>
      </div>

      <div className="os__stage">
        <main className="os__main">
          {current ? (
            <section key={current.id} className="window" role="region" aria-label={current.label}>
              <header className="window__bar">
                <button
                  type="button"
                  className="window__close"
                  onClick={() => setOpenApp(null)}
                  aria-label={`Close ${current.label}`}
                >
                  <X size={12} strokeWidth={3} />
                </button>
                <span className="window__title">
                  <current.icon size={14} style={{ color: current.color }} /> {current.label}
                </span>
              </header>
              <div ref={windowBody} className="window__body">
                <AppContent id={current.id} />
              </div>
            </section>
          ) : (
            <section className="launcher">
              <p className="launcher__eyebrow">Clemen's laptop</p>
              <h2 className="launcher__title">Where would you like to start?</h2>
              <div className="launcher__grid">
                {APPS.map((app, index) => (
                  <button
                    key={app.id}
                    type="button"
                    className="launcher__app"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                    onClick={() => setOpenApp(app.id)}
                  >
                    <span className="app-icon app-icon--large" style={{ background: app.color }}>
                      <app.icon size={30} strokeWidth={2.2} />
                    </span>
                    <span className="launcher__label">{app.label}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </main>

        {active && (
          <AvatarGuide
            text={openApp ? intros[openApp] : intros.welcome}
            greeting={!openApp}
            reducedMotion={reducedMotion}
          />
        )}
      </div>

      <nav className="dock" aria-label="Apps">
        {APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            className={`dock__app ${openApp === app.id ? 'is-open' : ''}`}
            onClick={() => setOpenApp(app.id)}
            aria-label={app.label}
            aria-current={openApp === app.id ? 'page' : undefined}
          >
            <span className="app-icon" style={{ background: app.color }}>
              <app.icon size={20} strokeWidth={2.2} />
            </span>
            <span className="dock__tooltip">{app.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
