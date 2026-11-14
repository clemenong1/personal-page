import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './Desk';

export type View = 'orbit' | 'entering' | 'laptop' | 'leaving';

interface Props {
  view: View;
  flight: MutableRefObject<{ p: number }>;
  screenRef: RefObject<THREE.Mesh>;
  reducedMotion: boolean;
  onArrive: () => void;
  onReturned: () => void;
}

const UP = new THREE.Vector3(0, 1, 0);

/**
 * Two camera states joined by one progress value (flight.p):
 * 0 is the wide view of the ship, 1 is the laptop screen filling the viewport.
 */
export default function CameraRig({ view, flight, screenRef, reducedMotion, onArrive, onReturned }: Props) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const canvas = useThree((s) => s.gl.domElement);
  const callbacks = useRef({ onArrive, onReturned });
  callbacks.current = { onArrive, onReturned };

  const scratch = useMemo(
    () => ({
      curve: new THREE.CatmullRomCurve3(
        [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
        false,
        'centripetal',
      ),
      wideTarget: new THREE.Vector3(),
      screen: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      side: new THREE.Vector3(),
      scale: new THREE.Vector3(),
      look: new THREE.Vector3(),
      position: new THREE.Vector3(),
      pointer: new THREE.Vector2(),
      euler: new THREE.Euler(0, 0, 0, 'YXZ'),
    }),
    [],
  );

  useEffect(() => {
    if (view !== 'entering' && view !== 'leaving') return;
    const entering = view === 'entering';
    const tween = gsap.to(flight.current, {
      p: entering ? 1 : 0,
      duration: reducedMotion ? 0.01 : entering ? 2.8 : 2.2,
      ease: 'power2.inOut',
      onComplete: () => (entering ? callbacks.current.onArrive() : callbacks.current.onReturned()),
    });
    return () => {
      tween.kill();
    };
  }, [view, flight, reducedMotion]);

  // Drag to look around: the camera orbits the globe. Yaw is unlimited, pitch stops short of the poles.
  const orbit = useRef({ yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0, zoom: 1, targetZoom: 1, spin: 0 });
  useEffect(() => {
    const o = orbit.current;
    if (view !== 'orbit') {
      // Ease back to the front view while flying, taking the short way round.
      o.yaw = Math.atan2(Math.sin(o.yaw), Math.cos(o.yaw));
      o.targetYaw = 0;
      o.targetPitch = 0;
      o.targetZoom = 1;
      o.spin = 0;
      return;
    }
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pinch = 0;
    const touches = new Map<number, { x: number; y: number }>();
    const pinchDistance = () => {
      const [a, b] = [...touches.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const down = (e: PointerEvent) => {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) pinch = pinchDistance();
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      o.spin = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add('is-dragging');
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) {
        const next = pinchDistance();
        if (pinch > 0) o.targetZoom = THREE.MathUtils.clamp(o.targetZoom * (pinch / next), 0.6, 1.35);
        pinch = next;
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      o.targetYaw -= dx * 0.006;
      o.targetPitch = THREE.MathUtils.clamp(o.targetPitch + dy * 0.005, -0.35, 1.05);
      o.spin = -dx * 0.006;
    };
    const up = (e: PointerEvent) => {
      touches.delete(e.pointerId);
      pinch = 0;
      if (touches.size > 0) return;
      dragging = false;
      canvas.classList.remove('is-dragging');
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      o.targetZoom = THREE.MathUtils.clamp(o.targetZoom * Math.exp(e.deltaY * 0.0012), 0.6, 1.35);
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', wheel, { passive: false });
    return () => {
      canvas.classList.remove('is-dragging');
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('wheel', wheel);
    };
  }, [view, canvas]);

  useFrame(({ clock, pointer }, delta) => {
    const screen = screenRef.current;
    if (!screen) return;
    const s = scratch;
    const p = flight.current.p;
    const aspect = size.width / size.height;
    const fovTan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

    // Wide view: on landscape screens the globe sits to the right, leaving room for the title.
    const shift = THREE.MathUtils.clamp((aspect - 1.15) * 3.2, 0, 1.9);
    const lift = aspect < 0.9 ? 0.9 : 0;
    const distance = Math.max(12.6, 9.6 / aspect);
    const t = reducedMotion ? 0 : clock.elapsedTime;
    s.pointer.lerp(pointer, 1 - Math.exp(-delta * 3));
    const parallax = reducedMotion ? 0 : 1 - p;

    // Orbit state: a flick keeps coasting briefly, then everything eases toward its target.
    const o = orbit.current;
    if (!canvas.classList.contains('is-dragging') && Math.abs(o.spin) > 0.0002) {
      o.targetYaw += o.spin;
      o.spin *= Math.exp(-delta * 4);
    }
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 9);
    o.yaw += (o.targetYaw - o.yaw) * ease;
    o.pitch += (o.targetPitch - o.pitch) * ease;
    o.zoom += (o.targetZoom - o.zoom) * ease;
    s.euler.set(-o.pitch, o.yaw, 0);

    // Both the camera and the point it looks at swing around the globe's axis together,
    // so the globe stays where it is on screen while the view turns.
    const pivotY = 2.7 + lift;
    const [wide, around, behind, close] = s.curve.points;
    s.wideTarget.set(-shift, 0, 0).applyEuler(s.euler);
    s.wideTarget.y += pivotY;
    wide
      .set(
        -shift + (s.pointer.x * 0.75 + Math.sin(t * 0.13) * 0.35) * parallax,
        1.5 + s.pointer.y * 0.4 * parallax,
        distance * o.zoom,
      )
      .applyEuler(s.euler);
    wide.y += pivotY;

    // Laptop view: straight in front of the screen, close enough for it to cover the viewport.
    screen.getWorldPosition(s.screen);
    screen.getWorldDirection(s.normal);
    screen.getWorldScale(s.scale);
    const halfH = (SCREEN_HEIGHT * s.scale.y) / 2;
    const halfW = (SCREEN_WIDTH * s.scale.x) / 2;
    const fill = Math.min(halfH / fovTan, halfW / (fovTan * aspect));
    close.copy(s.screen).addScaledVector(s.normal, fill);

    // Rise above the open cabin, then drop in over the avatar's shoulder.
    s.side.set(-s.normal.z, 0, s.normal.x).normalize();
    around.copy(s.screen).addScaledVector(s.side, 1.8).addScaledVector(UP, 3.0).addScaledVector(s.normal, -1.6);
    behind.copy(s.screen).addScaledVector(s.normal, 1.4).addScaledVector(UP, 1.2).addScaledVector(s.side, 0.2);

    s.curve.getPoint(p, s.position);
    const blend = THREE.MathUtils.smoothstep(p, 0, 0.75);
    s.look.lerpVectors(s.wideTarget, s.screen, blend);
    camera.position.copy(s.position);
    camera.lookAt(s.look);
  });

  return null;
}
