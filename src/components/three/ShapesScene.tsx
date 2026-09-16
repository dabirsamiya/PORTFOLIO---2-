import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { PALETTE as P } from "./textures";

type Props = {
  pointer: RefObject<{ x: number; y: number }>;
  active: boolean;
  reduced: boolean;
  mobile: boolean;
  variant: "statement" | "cta";
};

type Shape =
  | { kind: "sphere"; pos: [number, number, number]; r: number; color: string; roughness?: number }
  | { kind: "torus"; pos: [number, number, number]; r: number; tube: number; color: string; rot: [number, number, number] }
  | { kind: "card"; pos: [number, number, number]; size: [number, number, number]; color: string; rot: [number, number, number] };

const DESKTOP: Record<Props["variant"], Shape[]> = {
  cta: [
    { kind: "sphere", pos: [-4.4, 1.1, -1.6], r: 1.25, color: P.cream, roughness: 0.35 },
    { kind: "sphere", pos: [4.3, 1.7, -0.6], r: 0.62, color: P.pink, roughness: 0.5 },
    { kind: "sphere", pos: [3.4, -1.9, 0.5], r: 0.34, color: P.sand, roughness: 0.3 },
    { kind: "torus", pos: [4.9, -0.5, -1.6], r: 1.35, tube: 0.045, color: P.sand, rot: [1.15, 0.35, 0] },
    { kind: "card", pos: [-3.7, -1.85, 0.1], size: [1.7, 1.08, 0.06], color: P.pink, rot: [0.25, 0.55, -0.18] },
    { kind: "sphere", pos: [-2.2, 2.55, -1.0], r: 0.22, color: P.cream, roughness: 0.3 },
    { kind: "sphere", pos: [1.9, 2.7, -1.6], r: 0.17, color: P.pink, roughness: 0.5 },
    { kind: "sphere", pos: [-1.2, -2.75, -0.6], r: 0.14, color: P.sand, roughness: 0.3 },
  ],
  statement: [
    { kind: "sphere", pos: [4.6, 0.2, -1.8], r: 1.15, color: P.cream, roughness: 0.35 },
    { kind: "sphere", pos: [2.4, -3.0, -0.4], r: 0.42, color: P.pink, roughness: 0.5 },
    { kind: "torus", pos: [3.7, 1.8, -1.2], r: 1.0, tube: 0.04, color: P.sand, rot: [1.2, 0.3, 0] },
    { kind: "sphere", pos: [-4.7, 2.3, -1.4], r: 0.3, color: P.sand, roughness: 0.3 },
    { kind: "card", pos: [-5.4, -2.6, -0.6], size: [1.2, 0.78, 0.05], color: P.pink, rot: [0.2, 0.5, -0.15] },
    { kind: "sphere", pos: [1.6, 2.75, -1.5], r: 0.16, color: P.pink, roughness: 0.5 },
  ],
};

const MOBILE: Record<Props["variant"], Shape[]> = {
  cta: [
    { kind: "sphere", pos: [-1.25, 2.75, -1.2], r: 0.7, color: P.cream, roughness: 0.35 },
    { kind: "sphere", pos: [1.3, 2.35, -0.4], r: 0.28, color: P.pink, roughness: 0.5 },
    { kind: "torus", pos: [1.35, -2.6, -1.0], r: 0.7, tube: 0.035, color: P.sand, rot: [1.15, 0.35, 0] },
    { kind: "sphere", pos: [-1.2, -2.8, 0.0], r: 0.38, color: P.pink, roughness: 0.5 },
    { kind: "sphere", pos: [0.2, -3.0, -0.8], r: 0.14, color: P.sand, roughness: 0.3 },
  ],
  statement: [
    { kind: "sphere", pos: [1.35, 2.7, -1.2], r: 0.6, color: P.cream, roughness: 0.35 },
    { kind: "sphere", pos: [-1.3, -2.75, -0.2], r: 0.34, color: P.pink, roughness: 0.5 },
    { kind: "torus", pos: [-1.2, 2.5, -1.0], r: 0.55, tube: 0.03, color: P.sand, rot: [1.2, 0.3, 0] },
    { kind: "sphere", pos: [1.2, -2.6, -0.6], r: 0.16, color: P.sand, roughness: 0.3 },
  ],
};

function CameraFit() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useEffect(() => {
    const fov = THREE.MathUtils.degToRad(camera.fov);
    camera.position.z = 3.1 / Math.tan(fov / 2);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

function Rig({ pointer, reduced, children }: { pointer: Props["pointer"]; reduced: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    const k = Math.min(dt, 0.05);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, (reduced ? 0 : p.x * 0.12) + (reduced ? 0 : Math.sin(t * 0.15) * 0.03), 2, k);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, reduced ? 0 : -p.y * 0.08, 2, k);
    g.position.x = THREE.MathUtils.damp(g.position.x, reduced ? 0 : p.x * 0.25, 2, k);
    g.position.y = THREE.MathUtils.damp(g.position.y, reduced ? 0 : p.y * 0.15, 2, k);
  });
  return <group ref={ref}>{children}</group>;
}

function ShapeMesh({ s, reduced, i }: { s: Shape; reduced: boolean; i: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reduced || s.kind === "sphere") return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = s.rot[2] + Math.sin(t * 0.25 + i) * 0.15;
    ref.current.rotation.x = s.rot[0] + Math.cos(t * 0.2 + i) * 0.1;
  });
  const mat = <meshPhysicalMaterial color={s.color} roughness={"roughness" in s ? s.roughness ?? 0.4 : 0.4} clearcoat={0.5} clearcoatRoughness={0.3} />;
  return (
    <Float speed={reduced ? 0 : 0.9 + (i % 3) * 0.25} rotationIntensity={0.15} floatIntensity={0.7}>
      {s.kind === "sphere" && (
        <mesh position={s.pos}>
          <sphereGeometry args={[s.r, 56, 56]} />
          {mat}
        </mesh>
      )}
      {s.kind === "torus" && (
        <mesh ref={ref} position={s.pos} rotation={s.rot}>
          <torusGeometry args={[s.r, s.tube, 14, 160]} />
          {mat}
        </mesh>
      )}
      {s.kind === "card" && (
        <RoundedBox ref={ref} args={s.size} radius={0.06} smoothness={5} position={s.pos} rotation={s.rot}>
          {mat}
        </RoundedBox>
      )}
    </Float>
  );
}

function Scene({ pointer, reduced, mobile, variant }: Omit<Props, "active">) {
  const shapes = (mobile ? MOBILE : DESKTOP)[variant];
  return (
    <>
      <CameraFit />
      <ambientLight intensity={0.55} color="#f7e4dc" />
      <directionalLight position={[5, 6, 6]} intensity={1.5} color="#fff2e6" />
      <directionalLight position={[-6, -3, 2]} intensity={0.5} color="#cfa6a3" />
      <Rig pointer={pointer} reduced={reduced}>
        {shapes.map((s, i) => (
          <ShapeMesh key={i} s={s} reduced={reduced} i={i} />
        ))}
      </Rig>
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={1.8} color="#ffffff" position={[0, 6, -4]} scale={[14, 6, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={1.0} color="#f2d9d4" position={[-7, 1, 3]} scale={[8, 4, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={0.7} color="#e5cdb7" position={[7, -1, 3]} scale={[8, 4, 1]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

export default function ShapesScene({ pointer, active, reduced, mobile, variant }: Props) {
  return (
    <Canvas
      flat
      dpr={[1, mobile ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none", position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene pointer={pointer} reduced={reduced} mobile={mobile} variant={variant} />
      </Suspense>
    </Canvas>
  );
}
