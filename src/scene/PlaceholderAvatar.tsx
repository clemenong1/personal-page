import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Coded stand-in avatar: rounded sports-game style character with centre-parted hair.
 * Origin is the floor under the chair; the character faces +z.
 */

export type AvatarPose = 'typing' | 'guide';

interface Props {
  pose?: AvatarPose;
  /** Raises the right hand in a wave. */
  waving?: boolean;
  /** Animates the mouth. */
  talking?: boolean;
  still?: boolean;
}

const SKIN = '#f3c9a3';
const HAIR = '#1d1b22';
const HOODIE = '#ffc23d';
const PANTS = '#232a55';
const SHOE = '#f6f4ee';
const INK = '#231f2b';

const UP = new THREE.Vector3(0, 1, 0);
const scratch = new THREE.Vector3();

type V3 = [number, number, number];
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function placeLimb(mesh: THREE.Mesh | null, from: THREE.Vector3, to: THREE.Vector3) {
  if (!mesh) return;
  scratch.subVectors(to, from);
  const length = scratch.length();
  mesh.position.copy(from).addScaledVector(scratch, 0.5);
  mesh.quaternion.setFromUnitVectors(UP, scratch.normalize());
  mesh.scale.set(1, length / (mesh.userData.rest as number), 1);
}

/** A capsule between two fixed points. */
function Segment({ from, to, radius, color }: { from: V3; to: V3; radius: number; color: string }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    return {
      position: a.clone().addScaledVector(dir, 0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()),
      length: len,
    };
  }, [from, to]);
  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <capsuleGeometry args={[radius, length, 6, 16]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

const SHOULDER = { l: v(-0.185, 0.87, 0.0), r: v(0.185, 0.87, 0.0) };

const POSES = {
  typing: {
    elbowL: v(-0.25, 0.67, 0.12),
    elbowR: v(0.25, 0.67, 0.12),
    handL: v(-0.1, 0.795, 0.4),
    handR: v(0.1, 0.795, 0.4),
  },
  guide: {
    elbowL: v(-0.26, 0.7, 0.02),
    elbowR: v(0.26, 0.7, 0.02),
    handL: v(-0.25, 0.56, 0.1),
    handR: v(0.25, 0.56, 0.1),
  },
};
const WAVE = { elbow: v(0.33, 0.8, 0.06), hand: v(0.38, 1.1, 0.12) };

const UPPER_ARM_REST = 0.24;
const FOREARM_REST = 0.3;

export default function PlaceholderAvatar({
  pose = 'typing',
  waving = false,
  talking = false,
  still = false,
}: Props) {
  const head = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const upperL = useRef<THREE.Mesh>(null);
  const upperR = useRef<THREE.Mesh>(null);
  const foreL = useRef<THREE.Mesh>(null);
  const foreR = useRef<THREE.Mesh>(null);
  const handL = useRef<THREE.Mesh>(null);
  const handR = useRef<THREE.Mesh>(null);

  const state = useRef({
    elbowR: POSES[pose].elbowR.clone(),
    handRPos: POSES[pose].handR.clone(),
    handLPos: POSES[pose].handL.clone(),
    targetElbow: new THREE.Vector3(),
    targetHand: new THREE.Vector3(),
  });

  useFrame(({ clock }, delta) => {
    const t = still ? 0 : clock.elapsedTime;
    const s = state.current;
    const base = POSES[pose];
    const ease = 1 - Math.exp(-delta * 9);

    // Left hand: typing taps or resting
    s.handLPos.copy(base.handL);
    if (pose === 'typing') s.handLPos.y += Math.abs(Math.sin(t * 9.5)) * 0.022;

    // Right hand: wave when asked, otherwise mirror the left
    if (waving) {
      s.targetElbow.copy(WAVE.elbow);
      s.targetHand.copy(WAVE.hand);
      s.targetHand.x += Math.sin(t * 9) * 0.07;
      s.targetHand.y += Math.cos(t * 9) * 0.015;
    } else {
      s.targetElbow.copy(base.elbowR);
      s.targetHand.copy(base.handR);
      if (pose === 'typing') s.targetHand.y += Math.abs(Math.sin(t * 9.5 + 1.4)) * 0.022;
    }
    s.elbowR.lerp(s.targetElbow, ease);
    s.handRPos.lerp(s.targetHand, ease);

    placeLimb(upperL.current, SHOULDER.l, base.elbowL);
    placeLimb(foreL.current, base.elbowL, s.handLPos);
    placeLimb(upperR.current, SHOULDER.r, s.elbowR);
    placeLimb(foreR.current, s.elbowR, s.handRPos);
    handL.current?.position.copy(s.handLPos);
    handR.current?.position.copy(s.handRPos);

    if (head.current) {
      const lookUp = waving || pose === 'guide' ? 0.02 : 0.12;
      const targetX = lookUp + Math.sin(t * 0.9) * 0.03 + (talking ? Math.sin(t * 7) * 0.025 : 0);
      const targetY = Math.sin(t * 0.55) * 0.14;
      head.current.rotation.x += (targetX - head.current.rotation.x) * ease;
      head.current.rotation.y += (targetY - head.current.rotation.y) * ease;
      head.current.rotation.z = Math.sin(t * 0.7) * 0.03;
    }
    if (torso.current) {
      const breath = 1 + Math.sin(t * 1.8) * 0.012;
      torso.current.scale.set(breath, 1, breath);
    }
    if (eyes.current) {
      const blink = t % 3.6 > 3.48 ? 0.12 : 1;
      eyes.current.scale.y += (blink - eyes.current.scale.y) * Math.min(1, delta * 30);
    }
    if (mouth.current) {
      const open = talking ? 1 + Math.abs(Math.sin(t * 11)) * 0.9 : 1;
      mouth.current.scale.y += (open - mouth.current.scale.y) * ease;
    }
  });

  return (
    <group>
      {/* Legs */}
      {pose === 'typing' && (
        <>
          <Segment from={[-0.09, 0.5, 0.0]} to={[-0.1, 0.5, 0.33]} radius={0.068} color={PANTS} />
          <Segment from={[0.09, 0.5, 0.0]} to={[0.1, 0.5, 0.33]} radius={0.068} color={PANTS} />
          <Segment from={[-0.1, 0.47, 0.36]} to={[-0.1, 0.14, 0.38]} radius={0.058} color={PANTS} />
          <Segment from={[0.1, 0.47, 0.36]} to={[0.1, 0.14, 0.38]} radius={0.058} color={PANTS} />
          {[-0.1, 0.1].map((x) => (
            <mesh key={x} position={[x, 0.055, 0.42]} scale={[1, 0.62, 1.7]} castShadow>
              <sphereGeometry args={[0.075, 20, 14]} />
              <meshStandardMaterial color={SHOE} roughness={0.5} />
            </mesh>
          ))}
        </>
      )}

      {/* Torso */}
      <group ref={torso} position={[0, 0.69, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.16, 0.2, 8, 24]} />
          <meshStandardMaterial color={HOODIE} roughness={0.75} />
        </mesh>
        {/* Hood */}
        <mesh position={[0, 0.225, -0.03]} rotation={[Math.PI / 2 - 0.25, 0, 0]} castShadow>
          <torusGeometry args={[0.105, 0.045, 12, 28]} />
          <meshStandardMaterial color={HOODIE} roughness={0.75} />
        </mesh>
        {/* Pocket */}
        <mesh position={[0, -0.09, 0.148]} scale={[1, 0.6, 0.25]}>
          <sphereGeometry args={[0.085, 16, 12]} />
          <meshStandardMaterial color="#f5b22b" roughness={0.8} />
        </mesh>
      </group>

      {/* Arms */}
      <mesh ref={upperL} userData={{ rest: UPPER_ARM_REST }} castShadow>
        <capsuleGeometry args={[0.055, UPPER_ARM_REST, 6, 14]} />
        <meshStandardMaterial color={HOODIE} roughness={0.75} />
      </mesh>
      <mesh ref={upperR} userData={{ rest: UPPER_ARM_REST }} castShadow>
        <capsuleGeometry args={[0.055, UPPER_ARM_REST, 6, 14]} />
        <meshStandardMaterial color={HOODIE} roughness={0.75} />
      </mesh>
      <mesh ref={foreL} userData={{ rest: FOREARM_REST }} castShadow>
        <capsuleGeometry args={[0.05, FOREARM_REST, 6, 14]} />
        <meshStandardMaterial color={HOODIE} roughness={0.75} />
      </mesh>
      <mesh ref={foreR} userData={{ rest: FOREARM_REST }} castShadow>
        <capsuleGeometry args={[0.05, FOREARM_REST, 6, 14]} />
        <meshStandardMaterial color={HOODIE} roughness={0.75} />
      </mesh>
      <mesh ref={handL} castShadow>
        <sphereGeometry args={[0.056, 20, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      <mesh ref={handR} castShadow>
        <sphereGeometry args={[0.056, 20, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 1.13, 0]}>
        <mesh scale={[1, 0.96, 0.95]} castShadow>
          <sphereGeometry args={[0.2, 40, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.195, -0.01, 0]} scale={[0.5, 1, 0.8]}>
            <sphereGeometry args={[0.04, 16, 12]} />
            <meshStandardMaterial color={SKIN} roughness={0.6} />
          </mesh>
        ))}

        {/* Hair: cap over the top and back, plus two curtains from a centre parting */}
        <mesh rotation={[-0.5, 0, 0]} castShadow>
          <sphereGeometry args={[0.212, 40, 24, 0, Math.PI * 2, 0, 1.72]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} side={THREE.DoubleSide} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh
              position={[side * 0.092, 0.128, 0.118]}
              rotation={[0.25, side * 0.45, side * -0.62]}
              scale={[1.08, 0.5, 0.78]}
              castShadow
            >
              <sphereGeometry args={[0.105, 24, 18]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} />
            </mesh>
            <mesh
              position={[side * 0.168, 0.06, 0.07]}
              rotation={[0.1, side * 0.9, side * -1.15]}
              scale={[0.95, 0.42, 0.6]}
            >
              <sphereGeometry args={[0.085, 20, 14]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} />
            </mesh>
          </group>
        ))}

        {/* Face */}
        <group ref={eyes} position={[0, 0.0, 0]}>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.068, -0.004, 0.176]} scale={[1, 1.35, 0.55]}>
              <sphereGeometry args={[0.023, 16, 12]} />
              <meshStandardMaterial color={INK} roughness={0.3} />
            </mesh>
          ))}
        </group>
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[side * 0.07, 0.052, 0.18]}
            rotation={[0, side * 0.3, side * -0.08]}
          >
            <boxGeometry args={[0.048, 0.01, 0.01]} />
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, -0.03, 0.192]}>
          <sphereGeometry args={[0.013, 12, 10]} />
          <meshStandardMaterial color="#e6b58c" roughness={0.6} />
        </mesh>
        <mesh ref={mouth} position={[0, -0.068, 0.178]} rotation={[0.3, 0, Math.PI]}>
          <torusGeometry args={[0.03, 0.0065, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#8a3b3b" roughness={0.5} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[side * 0.12, -0.05, 0.142]}
            rotation={[0, side * 0.7, 0]}
            scale={[1, 0.7, 0.2]}
          >
            <sphereGeometry args={[0.026, 14, 10]} />
            <meshStandardMaterial color="#f5a48f" roughness={0.8} transparent opacity={0.75} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
