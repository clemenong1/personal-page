import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Avatar from '../scene/Avatar';

function useTypewriter(text: string, instant: boolean) {
  const [count, setCount] = useState(instant ? text.length : 0);
  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [text, instant]);
  return { shown: text.slice(0, count), done: count >= text.length };
}

interface Props {
  text: string;
  /** Wave while greeting. */
  greeting: boolean;
  reducedMotion: boolean;
}

/** The avatar in the corner of the laptop screen, introducing whichever app is open. */
export default function AvatarGuide({ text, greeting, reducedMotion }: Props) {
  const { shown, done } = useTypewriter(text, reducedMotion);

  return (
    <aside className="guide" aria-live="polite">
      <div className="guide__bubble">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {shown}
          {!done && <span className="guide__caret" />}
        </span>
      </div>
      <div className="guide__avatar" aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 30, position: [0, 1.0, 1.75] }}
          onCreated={({ camera }) => camera.lookAt(0, 0.96, 0)}
        >
          <hemisphereLight args={['#ffffff', '#c9d2f5', 1.2]} />
          <directionalLight position={[1.5, 1.6, 4]} intensity={1.7} color="#fff2de" />
          <directionalLight position={[0, -1.5, 3]} intensity={0.7} color="#ffe9d6" />
          <directionalLight position={[-3, 1, -2]} intensity={1.2} color="#6f9dff" />
          <Avatar pose="guide" waving={greeting && !done} talking={!done} still={reducedMotion} />
        </Canvas>
      </div>
    </aside>
  );
}
