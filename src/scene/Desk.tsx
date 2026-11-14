import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import Avatar from './Avatar';

export const SCREEN_WIDTH = 0.39;
export const SCREEN_HEIGHT = 0.25;

/** Where the avatar sits, in desk units (the desk group's origin is the floor under the desk). */
const SEAT: [number, number, number] = [0, 0, -0.42];
const DESK_TOP = 0.745;

const headWorld = new THREE.Vector3();

/** Paints a tiny version of the laptop's desktop so the screen reads as "on" from a distance. */
function useScreenTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 624;
    canvas.height = 400;
    const ctx = canvas.getContext('2d')!;
    const bg = ctx.createLinearGradient(0, 0, 624, 400);
    bg.addColorStop(0, '#141a4a');
    bg.addColorStop(0.55, '#1f3d9c');
    bg.addColorStop(1, '#3a7df0');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 624, 400);
    const glow = ctx.createRadialGradient(312, 470, 40, 312, 470, 330);
    glow.addColorStop(0, 'rgba(126, 224, 106, 0.55)');
    glow.addColorStop(1, 'rgba(126, 224, 106, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 624, 400);

    const tile = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, 54, 54, 15);
      ctx.fill();
    };
    tile(34, 56, '#ffc857');
    tile(34, 130, '#7ee06a');
    tile(34, 204, '#6aa8ff');
    tile(34, 278, '#ff7a6b');

    ctx.fillStyle = 'rgba(10, 14, 40, 0.72)';
    ctx.beginPath();
    ctx.roundRect(150, 70, 410, 250, 18);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.roundRect(178, 112, 190, 20, 8);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    [154, 182, 210].forEach((y, i) => {
      ctx.beginPath();
      ctx.roundRect(178, y, 330 - i * 50, 11, 5);
      ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.fillRect(0, 0, 624, 26);

    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

function Laptop({ screenRef }: { screenRef: RefObject<THREE.Mesh> }) {
  const screenTexture = useScreenTexture();
  return (
    <group>
      <RoundedBox args={[0.42, 0.018, 0.28]} radius={0.008} position={[0, DESK_TOP + 0.009, 0.05]} castShadow>
        <meshStandardMaterial color="#dfe4ee" roughness={0.35} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, DESK_TOP + 0.019, 0.07]}>
        <boxGeometry args={[0.36, 0.003, 0.13]} />
        <meshStandardMaterial color="#2a2f45" roughness={0.6} />
      </mesh>
      <mesh position={[0, DESK_TOP + 0.019, -0.045]}>
        <boxGeometry args={[0.12, 0.002, 0.07]} />
        <meshStandardMaterial color="#c9cfdc" roughness={0.3} metalness={0.3} />
      </mesh>
      {/* Lid, hinged at the back edge and leaning away from the avatar */}
      <group position={[0, DESK_TOP + 0.02, 0.19]} rotation={[0.26, 0, 0]}>
        <RoundedBox args={[0.42, 0.28, 0.012]} radius={0.006} position={[0, 0.14, 0]} castShadow>
          <meshStandardMaterial color="#dfe4ee" roughness={0.35} metalness={0.4} />
        </RoundedBox>
        <mesh ref={screenRef} position={[0, 0.14, -0.0068]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.14, 0.0066]}>
          <circleGeometry args={[0.028, 32]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>
      <pointLight position={[0, 0.96, 0.02]} color="#9dbbff" intensity={0.45} distance={1.1} decay={2} />
    </group>
  );
}

function Furniture() {
  return (
    <group>
      {/* Desk */}
      <RoundedBox args={[1.2, 0.05, 0.6]} radius={0.02} position={[0, DESK_TOP - 0.025, 0.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#f0c08a" roughness={0.6} />
      </RoundedBox>
      {/* Single pedestal leg */}
      <mesh position={[0, 0.34, 0.25]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.72, 20]} />
        <meshStandardMaterial color="#f7f3ea" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.04, 0.25]} castShadow>
        <cylinderGeometry args={[0.2, 0.23, 0.14, 32]} />
        <meshStandardMaterial color="#f7f3ea" roughness={0.5} />
      </mesh>

      {/* Mug */}
      <group position={[0.44, DESK_TOP, 0.0]}>
        <mesh position={[0, 0.045, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.09, 24]} />
          <meshStandardMaterial color="#ff7a6b" roughness={0.4} />
        </mesh>
        <mesh position={[0.045, 0.045, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.024, 0.008, 10, 20]} />
          <meshStandardMaterial color="#ff7a6b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.088, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.034, 24]} />
          <meshStandardMaterial color="#5a3a2a" roughness={0.3} />
        </mesh>
      </group>

      {/* Plant */}
      <group position={[0.47, DESK_TOP, 0.28]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.05, 0.1, 24]} />
          <meshStandardMaterial color="#f4f1ea" roughness={0.6} />
        </mesh>
        {(
          [
            [0, 0.17, 0, 0.085],
            [0.055, 0.13, 0.02, 0.06],
            [-0.05, 0.14, -0.02, 0.065],
            [0.01, 0.24, 0.01, 0.055],
          ] as const
        ).map(([x, y, z, r]) => (
          <mesh key={`${x}-${y}`} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 18, 14]} />
            <meshStandardMaterial color="#58c26a" roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Books */}
      <group position={[-0.45, DESK_TOP, -0.03]} rotation={[0, 0.3, 0]}>
        <RoundedBox args={[0.24, 0.035, 0.17]} radius={0.008} position={[0, 0.018, 0]} castShadow>
          <meshStandardMaterial color="#6aa8ff" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.2, 0.03, 0.15]} radius={0.008} position={[0.01, 0.051, 0.005]} rotation={[0, -0.25, 0]} castShadow>
          <meshStandardMaterial color="#7ee06a" roughness={0.6} />
        </RoundedBox>
      </group>

      {/* Lamp */}
      <group position={[-0.49, DESK_TOP, 0.3]}>
        <mesh position={[0, 0.01, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.075, 0.02, 24]} />
          <meshStandardMaterial color="#2a2f45" roughness={0.5} />
        </mesh>
        <mesh position={[0.025, 0.15, 0]} rotation={[0, 0, -0.17]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.34, 10]} />
          <meshStandardMaterial color="#2a2f45" roughness={0.5} />
        </mesh>
        <group position={[0.085, 0.3, 0]} rotation={[0, 0, -0.75]}>
          <mesh castShadow>
            <coneGeometry args={[0.075, 0.11, 24, 1, true]} />
            <meshStandardMaterial color="#ffc857" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <sphereGeometry args={[0.028, 16, 12]} />
            <meshBasicMaterial color="#fff4cf" toneMapped={false} />
          </mesh>
        </group>
        <pointLight position={[0.16, 0.24, 0]} color="#ffd9a0" intensity={0.5} distance={1.4} decay={2} />
      </group>
    </group>
  );
}

function Chair() {
  return (
    <group>
      <RoundedBox args={[0.44, 0.07, 0.42]} radius={0.03} position={[0, 0.4, 0.02]} castShadow>
        <meshStandardMaterial color="#f7f3ea" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[0.42, 0.46, 0.06]} radius={0.03} position={[0, 0.74, -0.2]} rotation={[-0.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#f7f3ea" roughness={0.65} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0.02]} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.36, 14]} />
        <meshStandardMaterial color="#2a2f45" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.04, 0.02]} castShadow>
        <cylinderGeometry args={[0.2, 0.23, 0.14, 28]} />
        <meshStandardMaterial color="#2a2f45" roughness={0.5} />
      </mesh>
    </group>
  );
}

interface DeskSetProps {
  interactive: boolean;
  still: boolean;
  screenRef: RefObject<THREE.Mesh>;
  flight: MutableRefObject<{ p: number }>;
  onEnter: () => void;
}

/** The desk, laptop and avatar. Clicking the avatar or the laptop starts the fly-in. */
export default function DeskSet({ interactive, still, screenRef, flight, onEnter }: DeskSetProps) {
  const [hovered, setHovered] = useState(false);
  const canvas = useThree((state) => state.gl.domElement);
  const [seated, setSeated] = useState(true);
  const person = useRef<THREE.Group>(null);
  const headAnchor = useRef<THREE.Group>(null);

  useEffect(() => {
    // An empty value falls back to the canvas's grab cursor from the stylesheet.
    canvas.style.cursor = hovered && interactive ? 'pointer' : '';
    return () => {
      canvas.style.cursor = '';
    };
  }, [hovered, interactive, canvas]);

  useEffect(() => {
    if (!interactive) setHovered(false);
  }, [interactive]);

  // The fly-in ends at the avatar's eye line, so hide them just before the camera reaches their head.
  useFrame(({ camera }) => {
    if (!person.current || !headAnchor.current) return;
    headAnchor.current.getWorldPosition(headWorld);
    person.current.visible = flight.current.p < 0.5 || camera.position.distanceTo(headWorld) > 1.15;
  });

  const over = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (interactive) setHovered(true);
    },
    [interactive],
  );
  const out = useCallback(() => setHovered(false), []);
  const click = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      // A drag that happens to end on the avatar is a look-around, not a click.
      if (e.delta > 6) return;
      if (interactive) onEnter();
    },
    [interactive, onEnter],
  );

  return (
    <group>
      <Furniture />
      <group onPointerOver={over} onPointerOut={out} onClick={click}>
        <Laptop screenRef={screenRef} />
        <group ref={person} position={SEAT}>
          {seated && <Chair />}
          <Avatar pose="typing" waving={hovered} still={still} onSeatedChange={setSeated} />
          <group ref={headAnchor} position={[0, 1.13, 0]} />
          {interactive && (
            <Html position={[0, 1.6, 0]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
              <div className={`click-hint ${hovered ? 'is-hovered' : ''}`}>
                <span className="click-hint__dot" />
                {hovered ? 'Open my laptop' : 'Click me'}
              </div>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}
