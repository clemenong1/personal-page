import * as THREE from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import landTopo from 'world-atlas/land-110m.json';

export interface EarthTextures {
  color: THREE.CanvasTexture;
  height: THREE.CanvasTexture;
}

/**
 * Draws the continents once into two equirectangular canvases:
 * a painted colour map and a black/white height map used to raise the land.
 */
export function createEarthTextures(width: number): EarthTextures {
  const height = width / 2;
  const topo = landTopo as unknown as Topology;
  const land = feature(topo, topo.objects.land);
  const projection = geoEquirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);

  // Colour map
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const c = colorCanvas.getContext('2d')!;
  const ocean = c.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, '#5aa2ff');
  ocean.addColorStop(0.28, '#2f76ee');
  ocean.addColorStop(0.5, '#2466e4');
  ocean.addColorStop(0.72, '#2f76ee');
  ocean.addColorStop(1, '#5aa2ff');
  c.fillStyle = ocean;
  c.fillRect(0, 0, width, height);

  const colorPath = geoPath(projection, c);
  // Shallow-water halo around the coasts
  c.beginPath();
  colorPath(land);
  c.lineJoin = 'round';
  c.lineWidth = width / 110;
  c.strokeStyle = 'rgba(126, 196, 255, 0.5)';
  c.stroke();

  const ground = c.createLinearGradient(0, 0, 0, height);
  ground.addColorStop(0, '#f4fbf6');
  ground.addColorStop(0.09, '#eaf7ee');
  ground.addColorStop(0.17, '#8fe070');
  ground.addColorStop(0.42, '#74d455');
  ground.addColorStop(0.5, '#9bdc5a');
  ground.addColorStop(0.6, '#74d455');
  ground.addColorStop(0.82, '#8fe070');
  ground.addColorStop(0.87, '#f4fbf6');
  ground.addColorStop(1, '#ffffff');
  c.beginPath();
  colorPath(land);
  c.fillStyle = ground;
  c.fill();

  // Height map
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = width / 2;
  heightCanvas.height = height / 2;
  const h = heightCanvas.getContext('2d')!;
  h.fillStyle = '#000';
  h.fillRect(0, 0, heightCanvas.width, heightCanvas.height);
  const heightProjection = geoEquirectangular()
    .scale(heightCanvas.width / (2 * Math.PI))
    .translate([heightCanvas.width / 2, heightCanvas.height / 2]);
  const heightPath = geoPath(heightProjection, h);
  h.beginPath();
  heightPath(land);
  h.fillStyle = '#fff';
  h.fill();

  const color = new THREE.CanvasTexture(colorCanvas);
  color.colorSpace = THREE.SRGBColorSpace;
  color.anisotropy = 8;
  color.wrapS = THREE.RepeatWrapping;

  const heightTexture = new THREE.CanvasTexture(heightCanvas);
  heightTexture.wrapS = THREE.RepeatWrapping;

  return { color, height: heightTexture };
}

/** Unit vector for a latitude/longitude, matching three's sphere UV layout. */
export function latLonToVector(lat: number, lon: number): THREE.Vector3 {
  const polar = THREE.MathUtils.degToRad(90 - lat);
  const around = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -Math.sin(polar) * Math.cos(around),
    Math.cos(polar),
    Math.sin(polar) * Math.sin(around),
  );
}
