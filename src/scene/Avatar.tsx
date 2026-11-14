import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import PlaceholderAvatar from './PlaceholderAvatar';
import type { AvatarPose } from './PlaceholderAvatar';

/**
 * Drop your model at public/models/avatar.glb and it replaces the coded stand-in.
 * Tune these if the model sits too high, too low or at the wrong size.
 */
const AVATAR_URL = '/models/avatar.glb';
const GLB = {
  /** Height in desk units when the model has a seated animation clip. */
  seatedHeight: 1.32,
  /** Height in desk units when the model is a static standing mesh. */
  standingHeight: 1.5,
  /** Height when the model appears as the guide in the corner of the laptop screen. */
  guideHeight: 1.38,
  /** Extra offset for a standing model, so it stands just behind the desk edge. */
  standingOffset: [0, 0, -0.14] as [number, number, number],
  /** How much the model lights itself, 0 to 1. Raise it if the face still looks dark. */
  selfLight: 0.38,
  /** Turn the model if it does not face the laptop (radians around the vertical axis). */
  turn: Math.PI,
};

export interface AvatarProps {
  pose?: AvatarPose;
  waving?: boolean;
  talking?: boolean;
  still?: boolean;
  /** Reports whether the avatar is seated, so the chair can be hidden for a standing model. */
  onSeatedChange?: (seated: boolean) => void;
}

let availability: Promise<boolean> | null = null;
function checkModel(): Promise<boolean> {
  if (!availability) {
    availability = fetch(AVATAR_URL, { method: 'HEAD' })
      .then((res) => res.ok && !(res.headers.get('content-type') ?? '').includes('text/html'))
      .catch(() => false);
  }
  return availability;
}

function useModelAvailable() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let alive = true;
    checkModel().then((ok) => {
      if (alive) setAvailable(ok);
    });
    return () => {
      alive = false;
    };
  }, []);
  return available;
}

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Avatar model failed to load, using the stand-in instead.', error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function GlbAvatar({ pose, waving, talking, still, onSeatedChange }: AvatarProps) {
  const gltf = useGLTF(AVATAR_URL);
  const root = useRef<THREE.Group>(null);
  const scene = useMemo(() => cloneSkinned(gltf.scene), [gltf.scene]);
  const { actions, names } = useAnimations(gltf.animations, root);

  const seatedClip = useMemo(() => names.find((n) => /typ|sit|seat|idle/i.test(n)) ?? names[0], [names]);
  const waveClip = useMemo(() => names.find((n) => /wave|hello|greet/i.test(n)), [names]);
  const seated = pose !== 'guide' && Boolean(seatedClip);

  const fit = useMemo(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.frustumCulled = false;
        // Generated meshes arrive faceted; rebuilding the normals gives the smooth toy look.
        if (!(mesh as THREE.SkinnedMesh).isSkinnedMesh) {
          const geometry = mesh.geometry.clone();
          geometry.deleteAttribute('normal');
          mesh.geometry = mergeVertices(geometry);
          mesh.geometry.computeVertexNormals();
        }
        // Generated models often omit the metallic value, which glTF reads as full metal and renders dark.
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          const standard = material as THREE.MeshStandardMaterial;
          if (standard.isMeshStandardMaterial && !standard.metalnessMap) {
            standard.metalness = 0;
            standard.roughness = Math.max(standard.roughness, 0.65);
            // Models exported without normals load flat-shaded, which shows every triangle.
            standard.flatShading = false;
            // Let the model's own colours glow a little so downward-facing areas (under the chin,
            // under the fringe) don't fall into shadow.
            if (standard.map) {
              standard.emissive = new THREE.Color('#ffffff');
              standard.emissiveMap = standard.map;
              standard.emissiveIntensity = GLB.selfLight;
            }
            standard.needsUpdate = true;
          }
        });
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const target = pose === 'guide' ? GLB.guideHeight : seatedClip ? GLB.seatedHeight : GLB.standingHeight;
    const scale = target / Math.max(size.y, 0.001);
    return {
      scale,
      position: [-center.x * scale, -box.min.y * scale, -center.z * scale] as const,
    };
  }, [scene, seatedClip, pose]);

  useEffect(() => {
    onSeatedChange?.(seated);
  }, [seated, onSeatedChange]);

  useEffect(() => {
    const name = waving && waveClip ? waveClip : seatedClip;
    const action = name ? actions[name] : undefined;
    if (!action) return;
    action.reset().fadeIn(0.3).play();
    return () => {
      action.fadeOut(0.3);
    };
  }, [actions, seatedClip, waveClip, waving]);

  // A model without animation clips still gets a little life: a breathing bob and a slow sway.
  const idle = useRef<THREE.Group>(null);
  const hasClips = names.length > 0;
  useFrame(({ clock }) => {
    if (!idle.current || hasClips || still) return;
    const t = clock.elapsedTime;
    const energy = waving || talking ? 2.2 : 1;
    idle.current.position.y = Math.sin(t * 1.9 * energy) * 0.008 * energy;
    idle.current.rotation.y = Math.sin(t * 0.6) * 0.07;
    idle.current.rotation.z = Math.sin(t * 0.9 * energy) * 0.012 * energy;
  });

  const offset: [number, number, number] = seated || pose === 'guide' ? [0, 0, 0] : GLB.standingOffset;

  return (
    <group ref={root} position={offset} rotation={[0, GLB.turn, 0]}>
      <group ref={idle}>
        <group position={fit.position} scale={fit.scale}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

export default function Avatar(props: AvatarProps) {
  const available = useModelAvailable();
  const { onSeatedChange } = props;
  const placeholder = <PlaceholderAvatar {...props} />;

  useEffect(() => {
    if (!available) onSeatedChange?.(true);
  }, [available, onSeatedChange]);

  if (!available) return placeholder;
  return (
    <ModelBoundary fallback={placeholder}>
      <Suspense fallback={placeholder}>
        <GlbAvatar {...props} />
      </Suspense>
    </ModelBoundary>
  );
}
