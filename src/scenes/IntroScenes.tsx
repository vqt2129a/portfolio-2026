import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 160;
const MAX_LINES = 280;
const CONNECT_DIST = 10;

/**
 * Unified particle + connection-lines component.
 * Both share the same position array so lines connect to actual dots.
 */
function ParticleNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  const posRef = useRef<Float32Array>(new Float32Array(0));
  const velRef = useRef<Float32Array>(new Float32Array(0));
  const phaseRef = useRef<Float32Array>(new Float32Array(0));
  const linePositionsRef = useRef<Float32Array>(new Float32Array(0));

  useEffect(() => {
    const group = groupRef.current;

    // --- shared positions ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 56;
      positions[i3 + 1] = (Math.random() - 0.5) * 36;
      positions[i3 + 2] = (Math.random() - 0.5) * 28;

      velocities[i3] = (Math.random() - 0.5) * 0.014;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.007;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.009;

      phases[i] = Math.random() * Math.PI * 2;
    }

    posRef.current = positions;
    velRef.current = velocities;
    phaseRef.current = phases;

    // --- dot sprite ---
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(0,255,170,1)");
    gradient.addColorStop(0.35, "rgba(0,255,170,0.45)");
    gradient.addColorStop(1, "rgba(0,255,170,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    // --- points ---
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointMat = new THREE.PointsMaterial({
      map: texture,
      size: 0.55,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    pointsRef.current = points;
    group.add(points);

    // --- lines (shares same position data) ---
    const linePositions = new Float32Array(MAX_LINES * 6);
    linePositionsRef.current = linePositions;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: "#00ffaa",
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const segments = new THREE.LineSegments(lineGeo, lineMat);
    linesRef.current = segments;
    group.add(segments);

    return () => {
      group.remove(points);
      group.remove(segments);
      pointMat.dispose();
      texture.dispose();
      pointGeo.dispose();
      lineMat.dispose();
      lineGeo.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    const lines = linesRef.current;
    if (!points || !lines) return;

    const pos = posRef.current;
    const vel = velRef.current;
    const phases = phaseRef.current;
    const t = state.clock.elapsedTime;

    // update positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += vel[i3];
      pos[i3 + 1] += vel[i3 + 1] + Math.sin(t * 0.4 + phases[i]) * 0.003;
      pos[i3 + 2] += vel[i3 + 2];

      // wrap
      if (pos[i3] > 28) pos[i3] = -28;
      if (pos[i3] < -28) pos[i3] = 28;
      if (pos[i3 + 1] > 18) pos[i3 + 1] = -18;
      if (pos[i3 + 1] < -18) pos[i3 + 1] = 18;
    }

    // rebuild connections from the SAME position data
    const linePos = linePositionsRef.current;
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_LINES; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_LINES; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DIST) {
          const k = lineIdx * 6;
          linePos[k] = pos[i * 3];
          linePos[k + 1] = pos[i * 3 + 1];
          linePos[k + 2] = pos[i * 3 + 2];
          linePos[k + 3] = pos[j * 3];
          linePos[k + 4] = pos[j * 3 + 1];
          linePos[k + 5] = pos[j * 3 + 2];
          lineIdx++;
        }
      }
    }

    lines.geometry.setDrawRange(0, lineIdx * 2);
    (lines.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (points.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;

    // gentle rotation
    const rot = delta * 0.025;
    points.rotation.y += rot;
    lines.rotation.y += rot;
  });

  return <group ref={groupRef} />;
}

export default function IntroScenes() {
  return (
    <Canvas camera={{ position: [0, 0, 28], fov: 60 }}>
      <ambientLight intensity={0.1} />
      <ParticleNetwork />
    </Canvas>
  );
}
