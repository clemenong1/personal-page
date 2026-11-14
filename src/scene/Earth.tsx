import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createEarthTextures, latLonToVector } from './landTextures';
import type { Quality } from '../hooks/useQuality';

export const EARTH_RADIUS = 1.6;
const LAND_HEIGHT = 0.055;

// The desk sits on Singapore, so Singapore is rotated to the top of the globe.
const HOME = { lat: 1.35, lon: 103.82 };

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = clamp(dot(vNormal, vView) / 0.5, 0.0, 1.0);
    float glow = pow(d, 2.6);
    gl_FragColor = vec4(uColor * glow, glow);
  }
`;

const hazeFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - clamp(dot(vNormal, -vView), 0.0, 1.0), 3.2);
    gl_FragColor = vec4(uColor * rim, rim) * 0.5;
  }
`;

function Cloud({ lat, lon, size }: { lat: number; lon: number; size: number }) {
  const position = useMemo(
    () => latLonToVector(lat, lon).multiplyScalar(EARTH_RADIUS * 1.13),
    [lat, lon],
  );
  const quaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position.clone().normalize(),
      ),
    [position],
  );
  return (
    <group position={position} quaternion={quaternion} scale={size * 0.62}>
      <mesh position={[0, 0, 0]} scale={[1.3, 0.55, 0.9]}>
        <sphereGeometry args={[0.16, 20, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
      <mesh position={[0.15, 0.02, 0.03]} scale={[1, 0.5, 0.8]}>
        <sphereGeometry args={[0.13, 20, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
      <mesh position={[-0.14, 0.01, -0.03]} scale={[1, 0.45, 0.8]}>
        <sphereGeometry args={[0.11, 20, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
    </group>
  );
}

const CLOUDS = [
  { lat: 18, lon: -150, size: 1.1 },
  { lat: -22, lon: -95, size: 0.9 },
  { lat: 30, lon: -40, size: 1.2 },
  { lat: -35, lon: 10, size: 1 },
  { lat: 8, lon: 55, size: 0.85 },
  { lat: -12, lon: 150, size: 1.05 },
  { lat: 38, lon: 120, size: 0.8 },
  { lat: -48, lon: -170, size: 1.15 },
];

export default function Earth({ quality }: { quality: Quality }) {
  const spin = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Group>(null);

  const textures = useMemo(() => createEarthTextures(quality.textureSize), [quality.textureSize]);
  useEffect(
    () => () => {
      textures.color.dispose();
      textures.height.dispose();
    },
    [textures],
  );

  const homeOnTop = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        latLonToVector(HOME.lat, HOME.lon),
        new THREE.Vector3(0, 1, 0),
      ),
    [],
  );

  const haloUniforms = useMemo(() => ({ uColor: { value: new THREE.Color('#4f9dff') } }), []);
  const hazeUniforms = useMemo(() => ({ uColor: { value: new THREE.Color('#9fd0ff') } }), []);

  useFrame((_, delta) => {
    if (quality.reducedMotion) return;
    if (spin.current) spin.current.rotation.y += delta * 0.035;
    if (clouds.current) clouds.current.rotation.y += delta * 0.055;
  });

  return (
    <group>
      <group ref={spin}>
        <mesh quaternion={homeOnTop} receiveShadow>
          <sphereGeometry args={[EARTH_RADIUS, quality.earthSegments, quality.earthSegments / 2]} />
          <meshStandardMaterial
            map={textures.color}
            displacementMap={textures.height}
            displacementScale={LAND_HEIGHT}
            bumpMap={textures.height}
            bumpScale={0.8}
            roughness={0.62}
            metalness={0}
          />
        </mesh>
      </group>

      {/* Clouds stay in a band around the middle so they never drift through the desk. */}
      <group ref={clouds} rotation={[0.12, 0, 0.08]}>
        {CLOUDS.map((cloud) => (
          <Cloud key={`${cloud.lat}-${cloud.lon}`} {...cloud} />
        ))}
      </group>

      <mesh scale={1.045}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={hazeFragment}
          uniforms={hazeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.17}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export const DESK_FLOOR_Y = EARTH_RADIUS + LAND_HEIGHT * 0.6;
