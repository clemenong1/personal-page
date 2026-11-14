import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Space from './Space';
import Earth from './Earth';
import Shuttle, { Floating } from './Shuttle';
import DeskSet from './Desk';
import CameraRig from './CameraRig';
import type { View } from './CameraRig';
import type { Quality } from '../hooks/useQuality';

/** Height of the shuttle's cabin floor in the scene. */
const FLOOR_Y = 1.63;
const DESK_SCALE = 1.7;
/** Nudges the desk set forward so it sits in the middle of the cabin floor. */
const DESK_OFFSET: [number, number, number] = [0, 0, 0.22];
/** Turns the ship and the desk together so the open side faces slightly toward the title. */
const DESK_TURN = -0.42;

interface Props {
  view: View;
  paused: boolean;
  quality: Quality;
  flight: MutableRefObject<{ p: number }>;
  onEnter: () => void;
  onArrive: () => void;
  onReturned: () => void;
  onReady: () => void;
}

export default function Experience({
  view,
  paused,
  quality,
  flight,
  onEnter,
  onArrive,
  onReturned,
  onReady,
}: Props) {
  const screenRef = useRef<THREE.Mesh>(null);

  return (
    <Canvas
      shadows={quality.shadows}
      dpr={quality.dpr}
      frameloop={paused ? 'never' : 'always'}
      camera={{ fov: 35, near: 0.05, far: 400, position: [0, 2.3, 11] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <color attach="background" args={['#04050d']} />
      <Space quality={quality} />

      <hemisphereLight args={['#cfe0ff', '#3a4170', 0.85]} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.6}
        color="#fff2de"
        castShadow={quality.shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02}
        shadow-camera-left={-3.2}
        shadow-camera-right={3.2}
        shadow-camera-top={4.2}
        shadow-camera-bottom={-2.2}
        shadow-camera-near={1}
        shadow-camera-far={22}
      />
      <directionalLight position={[-6, 2.5, -5]} intensity={1.5} color="#6f9dff" />

      {/* Home planet, far behind the ship */}
      <group position={[17, 10, -42]} scale={2.4}>
        <Earth quality={quality} />
      </group>

      <Floating still={quality.reducedMotion}>
        <group position={[0, FLOOR_Y, 0]} rotation={[0, DESK_TURN, 0]}>
          <Shuttle still={quality.reducedMotion} />
        </group>
        <group position={[0, FLOOR_Y, 0]} rotation={[0, DESK_TURN, 0]} scale={DESK_SCALE}>
          <group position={DESK_OFFSET}>
            <DeskSet
              interactive={view === 'orbit'}
              still={quality.reducedMotion}
              screenRef={screenRef}
              flight={flight}
              onEnter={onEnter}
            />
          </group>
        </group>
      </Floating>

      <CameraRig
        view={view}
        flight={flight}
        screenRef={screenRef}
        reducedMotion={quality.reducedMotion}
        onArrive={onArrive}
        onReturned={onReturned}
      />
    </Canvas>
  );
}
