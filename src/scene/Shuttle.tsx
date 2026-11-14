import { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Cartoon space shuttle with the roof and near side of the body cut away.
 * The group's origin is the centre of the cabin floor; the nose points along +x
 * and the open side faces +z.
 */

const RADIUS = 1.6;
/** Height of the hull's centre line above the cabin floor. */
const AXIS_Y = 0.75;
const BAY_HALF = 1.6;
const NOSE_LENGTH = 2.4;
const REAR_LENGTH = 1.1;

const WHITE = '#f4f5f8';
const BLACK = '#1b1d27';
const INNER = '#d9e0f0';
const FLOOR = '#aab6d3';

// Laying a three.js cylinder along x: the hull's cross-section angle runs opposite to theta.
const LAY_ALONG_X: [number, number, number] = [0, 0, -Math.PI / 2];
// Keep the floor and a low lip on each side; everything above is the cut-out,
// so nothing stands between the camera and the avatar from any angle.
const HULL_START = THREE.MathUtils.degToRad(20);
const HULL_SWEEP = THREE.MathUtils.degToRad(140);

function Flame({ still }: { still: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    const flicker = 1 + Math.sin(t * 23) * 0.08 + Math.sin(t * 37) * 0.05;
    outer.current?.scale.set(1, flicker, 1);
    inner.current?.scale.set(1, 1 + Math.sin(t * 29 + 1) * 0.12, 1);
  });
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={outer} position={[0, 0.55, 0]}>
        <coneGeometry args={[0.42, 1.1, 20]} />
        <meshBasicMaterial color="#ff8a2a" toneMapped={false} />
      </mesh>
      <mesh ref={inner} position={[0, 0.4, 0]}>
        <coneGeometry args={[0.24, 0.75, 20]} />
        <meshBasicMaterial color="#ffe27a" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Shuttle({ still }: { still: boolean }) {
  const wing = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(1.9, 0);
    shape.lineTo(-1.7, 2.75);
    shape.lineTo(-2.7, 2.75);
    shape.lineTo(-2.7, -2.75);
    shape.lineTo(-1.7, -2.75);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05,
      bevelSegments: 3,
    });
  }, []);

  const fin = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.7, 0);
    shape.lineTo(-2.35, 1.45);
    shape.lineTo(-2.9, 1.45);
    shape.lineTo(-2.65, 0);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -0.08);
    return geometry;
  }, []);

  const noseScale: [number, number, number] = [1, NOSE_LENGTH / RADIUS, 1];

  return (
    <group position={[0, AXIS_Y, 0]}>
      {/* Cut-away body: white outside, pale inside */}
      <mesh rotation={LAY_ALONG_X} castShadow receiveShadow>
        <cylinderGeometry args={[RADIUS, RADIUS, BAY_HALF * 2, 64, 1, true, HULL_START, HULL_SWEEP]} />
        <meshStandardMaterial color={WHITE} roughness={0.45} />
      </mesh>
      <mesh rotation={LAY_ALONG_X} receiveShadow>
        <cylinderGeometry
          args={[RADIUS - 0.04, RADIUS - 0.04, BAY_HALF * 2, 64, 1, true, HULL_START, HULL_SWEEP]}
        />
        <meshStandardMaterial color={INNER} roughness={0.7} side={THREE.BackSide} />
      </mesh>
      {/* Black heat-shield belly */}
      <mesh position={[-REAR_LENGTH / 2, 0, 0]} rotation={LAY_ALONG_X}>
        <cylinderGeometry
          args={[
            RADIUS + 0.02,
            RADIUS + 0.02,
            BAY_HALF * 2 + REAR_LENGTH,
            48,
            1,
            true,
            // Centred on the underside (theta 90 degrees once the cylinder is laid along x).
            THREE.MathUtils.degToRad(38),
            THREE.MathUtils.degToRad(104),
          ]}
        />
        <meshStandardMaterial color={BLACK} roughness={0.6} />
      </mesh>

      {/* Cabin floor and the two end walls */}
      <mesh position={[0, -AXIS_Y - 0.06, 0]} receiveShadow>
        <boxGeometry args={[BAY_HALF * 2, 0.12, 2.82]} />
        <meshStandardMaterial color={FLOOR} roughness={0.75} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (BAY_HALF - 0.02), 0, 0]}
          rotation={[0, (side * -Math.PI) / 2, 0]}
          receiveShadow
        >
          <circleGeometry args={[RADIUS - 0.03, 48]} />
          <meshStandardMaterial color={INNER} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* A round porthole on the wall behind the cockpit */}
      <mesh position={[BAY_HALF - 0.05, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#0b1030" toneMapped={false} />
      </mesh>
      <mesh position={[BAY_HALF - 0.06, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <ringGeometry args={[0.3, 0.37, 32]} />
        <meshStandardMaterial color={BLACK} roughness={0.5} />
      </mesh>
      <pointLight position={[0, 0.9, 0.4]} color="#eaf0ff" intensity={0.9} distance={4} decay={2} />

      {/* Nose */}
      <group position={[BAY_HALF, 0, 0]} rotation={LAY_ALONG_X}>
        <mesh scale={noseScale} castShadow>
          <sphereGeometry args={[RADIUS, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={WHITE} roughness={0.45} />
        </mesh>
        <mesh scale={noseScale}>
          <sphereGeometry args={[RADIUS + 0.015, 40, 12, 0, Math.PI * 2, 0, 0.62]} />
          <meshStandardMaterial color={BLACK} roughness={0.55} />
        </mesh>
        {/* Cockpit windows, wrapped onto the nose */}
        {[-0.5, -0.1, 0.3, 0.7, 1.1, 1.5].map((centre) => (
          <mesh key={centre} scale={noseScale}>
            <sphereGeometry args={[RADIUS + 0.02, 12, 6, centre - 0.14, 0.28, 0.9, 0.17]} />
            <meshStandardMaterial color="#141a3a" roughness={0.2} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Rear section, engines and flame */}
      <mesh position={[-BAY_HALF - REAR_LENGTH / 2, 0, 0]} rotation={LAY_ALONG_X} castShadow>
        <cylinderGeometry args={[RADIUS, RADIUS, REAR_LENGTH, 64]} />
        <meshStandardMaterial color={WHITE} roughness={0.45} />
      </mesh>
      <mesh position={[-BAY_HALF - REAR_LENGTH - 0.14, 0, 0]} rotation={LAY_ALONG_X}>
        <cylinderGeometry args={[RADIUS * 0.72, RADIUS, 0.3, 48]} />
        <meshStandardMaterial color={BLACK} roughness={0.6} />
      </mesh>
      {(
        [
          [0.45, 0],
          [-0.35, 0.5],
          [-0.35, -0.5],
        ] as const
      ).map(([y, z]) => (
        <group key={`${y}-${z}`} position={[-BAY_HALF - REAR_LENGTH - 0.5, y, z]}>
          <mesh rotation={LAY_ALONG_X}>
            <cylinderGeometry args={[0.26, 0.4, 0.5, 24, 1, true]} />
            <meshStandardMaterial color="#3a3f52" roughness={0.4} metalness={0.5} side={THREE.DoubleSide} />
          </mesh>
          <group position={[-0.2, 0, 0]}>
            <Flame still={still} />
          </group>
        </group>
      ))}
      <pointLight
        position={[-BAY_HALF - REAR_LENGTH - 1.4, 0, 0]}
        color="#ff9a3c"
        intensity={6}
        distance={5}
        decay={2}
      />

      {/* Tail fin */}
      <group position={[0, RADIUS - 0.15, 0]}>
        <mesh geometry={fin} castShadow>
          <meshStandardMaterial color={WHITE} roughness={0.45} />
        </mesh>
        <mesh geometry={fin} position={[0.09, 0.02, 0]} scale={[1, 1, 0.7]}>
          <meshStandardMaterial color={BLACK} roughness={0.6} />
        </mesh>
      </group>

      {/* Delta wings: white on top, black underneath */}
      <mesh geometry={wing} position={[0, -1.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>
      <mesh
        geometry={wing}
        position={[0.03, -1.3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.02, 1.02, 0.6]}
      >
        <meshStandardMaterial color={BLACK} roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Gives the whole ship (and everyone aboard) a slow weightless drift. */
export function Floating({ still, children }: { still: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (still || !group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.7) * 0.07;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.018;
    group.current.rotation.x = Math.sin(t * 0.4 + 1) * 0.012;
  });
  return <group ref={group}>{children}</group>;
}
