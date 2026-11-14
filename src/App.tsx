import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Experience from './scene/Experience';
import type { View } from './scene/CameraRig';
import LaptopOS from './os/LaptopOS';
import { profile } from './data/profile';
import { useQuality } from './hooks/useQuality';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function App() {
  const quality = useQuality();
  const webgl = useMemo(hasWebGL, []);
  // Without WebGL there is no scene to fly through, so the laptop opens straight away.
  const [view, setView] = useState<View>(webgl ? 'orbit' : 'laptop');
  const [ready, setReady] = useState(!webgl);
  const [paused, setPaused] = useState(false);
  const flight = useRef({ p: 0 });

  const enter = useCallback(() => setView((v) => (v === 'orbit' ? 'entering' : v)), []);
  const exit = useCallback(() => setView((v) => (v === 'laptop' ? 'leaving' : v)), []);
  const arrive = useCallback(() => setView('laptop'), []);
  const returned = useCallback(() => setView('orbit'), []);
  const markReady = useCallback(() => setReady(true), []);

  // Stop rendering the 3D scene once the laptop screen has fully covered it.
  useEffect(() => {
    if (view !== 'laptop') {
      setPaused(false);
      return;
    }
    const id = window.setTimeout(() => setPaused(true), 800);
    return () => window.clearTimeout(id);
  }, [view]);

  const heroVisible = ready && view === 'orbit';

  return (
    <div className="app">
      {webgl && (
        <div className={`scene ${ready ? 'is-ready' : ''}`}>
          <Experience
            view={view}
            paused={paused}
            quality={quality}
            flight={flight}
            onEnter={enter}
            onArrive={arrive}
            onReturned={returned}
            onReady={markReady}
          />
        </div>
      )}

      <div className={`loader ${ready ? 'is-done' : ''}`} aria-hidden={ready}>
        <span className="loader__planet" />
        <span className="loader__text">Entering orbit</span>
      </div>

      <header className={`hero ${heroVisible ? 'is-visible' : ''}`} inert={heroVisible ? undefined : ''}>
        <p className="hero__eyebrow">Portfolio · Singapore 1.35°N 103.82°E</p>
        <h1 className="hero__name">
          Clemen
          <br />
          Ong
        </h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <button type="button" className="hero__cta" onClick={enter}>
            Open my laptop <ArrowRight size={18} />
          </button>
          <div className="hero__socials">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hero__social"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </header>

      {webgl && (
        <p className={`drag-hint ${heroVisible ? 'is-visible' : ''}`}>Drag to look around · Scroll to zoom</p>
      )}

      <LaptopOS
        active={view === 'laptop'}
        canExit={webgl}
        reducedMotion={quality.reducedMotion}
        onExit={exit}
      />
    </div>
  );
}
