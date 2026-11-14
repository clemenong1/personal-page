import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { Quality } from '../hooks/useQuality';

const nebulaVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragment = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    vec3 base = mix(vec3(0.012, 0.014, 0.04), vec3(0.03, 0.04, 0.105), smoothstep(-1.0, 1.0, d.y));
    float violet = pow(max(dot(d, normalize(vec3(-0.7, 0.35, -0.6))), 0.0), 5.0);
    float teal = pow(max(dot(d, normalize(vec3(0.85, -0.15, -0.5))), 0.0), 8.0);
    float ember = pow(max(dot(d, normalize(vec3(0.2, 0.75, -0.6))), 0.0), 14.0);
    vec3 color = base
      + vec3(0.2, 0.09, 0.38) * violet * 0.6
      + vec3(0.03, 0.24, 0.36) * teal * 0.55
      + vec3(0.3, 0.14, 0.1) * ember * 0.25;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Moon({ still }: { still: boolean }) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!still && pivot.current) pivot.current.rotation.y += delta * 0.09;
  });
  return (
    <group position={[-18, 9, -36]} rotation={[0.35, 0, -0.2]} scale={3}>
      <group ref={pivot} rotation={[0, 2.2, 0]}>
        <mesh position={[3.1, 0, 0]} castShadow>
          <sphereGeometry args={[0.15, 32, 24]} />
          <meshStandardMaterial color="#e9e6df" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function ShootingStar() {
  const mesh = useRef<THREE.Mesh>(null);
  const flight = useRef({
    start: 3,
    duration: 0.9,
    from: new THREE.Vector3(-10, 14, -40),
    travel: new THREE.Vector3(12, -6, 0),
  });

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const f = flight.current;
    const k = (clock.elapsedTime - f.start) / f.duration;
    if (k < 0) {
      m.visible = false;
      return;
    }
    if (k > 1) {
      m.visible = false;
      const direction = Math.random() > 0.5 ? 1 : -1;
      f.start = clock.elapsedTime + 4 + Math.random() * 7;
      f.from.set(-24 + Math.random() * 48, 6 + Math.random() * 14, -40);
      f.travel.set(direction * (9 + Math.random() * 7), -(4 + Math.random() * 4), 0);
      return;
    }
    m.visible = true;
    m.position.copy(f.from).addScaledVector(f.travel, k);
    m.rotation.z = Math.atan2(f.travel.y, f.travel.x);
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(k * Math.PI) * 0.9;
  });

  return (
    <mesh ref={mesh} visible={false}>
      <planeGeometry args={[2.6, 0.035]} />
      <meshBasicMaterial
        color="#dbe9ff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Space({ quality }: { quality: Quality }) {
  const uniforms = useMemo(() => ({}), []);
  return (
    <>
      <mesh>
        <sphereGeometry args={[140, 32, 16]} />
        <shaderMaterial
          vertexShader={nebulaVertex}
          fragmentShader={nebulaFragment}
          uniforms={uniforms}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Stars
        radius={60}
        depth={50}
        count={quality.stars}
        factor={5.2}
        saturation={0.4}
        fade
        speed={quality.reducedMotion ? 0 : 0.8}
      />
      <Moon still={quality.reducedMotion} />
      {!quality.reducedMotion && <ShootingStar />}
    </>
  );
}
