import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Html, Lightformer, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { createBrowserTexture } from "./browserTexture";
import { PALETTE as P, getShadowTexture } from "./textures";

export type PointerRef = RefObject<{ x: number; y: number }>;
export type ScrollRef = RefObject<number>;

type SceneProps = {
  pointer: PointerRef;
  scroll: ScrollRef;
  reduced: boolean;
  mobile: boolean;
};

type NodeDef = { label: string; pos: [number, number, number]; phase: number; speed: number };

const NODES: NodeDef[] = [
  { label: "Website", pos: [-3.0, 1.45, 0.3], phase: 0.0, speed: 0.9 },
  { label: "Google", pos: [2.95, 1.25, -0.2], phase: 1.05, speed: 0.6 },
  { label: "Customers", pos: [3.2, -0.75, 0.5], phase: 2.1, speed: 1.1 },
  { label: "Reviews", pos: [-3.25, -0.6, -0.2], phase: 3.15, speed: 0.5 },
  { label: "WhatsApp", pos: [1.15, -2.25, 0.8], phase: 4.2, speed: 1.3 },
  { label: "Repeat Business", pos: [-0.9, 2.35, -0.6], phase: 5.25, speed: 0.7 },
];

type OrbDef = {
  pos: [number, number, number];
  r: number;
  color: string;
  roughness: number;
  speed: number;
  phase: number;
  mobile?: boolean;
};

const ORBS: OrbDef[] = [
  { pos: [-2.55, -1.6, 0.6], r: 0.5, color: P.pink, roughness: 0.55, speed: 1.15, phase: 0.4, mobile: true },
  { pos: [2.65, 1.95, -0.6], r: 0.34, color: P.sand, roughness: 0.25, speed: 0.55, phase: 1.3, mobile: true },
  { pos: [2.45, -1.75, 1.0], r: 0.17, color: P.burgundy, roughness: 0.35, speed: 1.4, phase: 2.2, mobile: true },
  { pos: [-2.4, 2.05, -0.9], r: 0.24, color: P.cream2, roughness: 0.3, speed: 0.75, phase: 3.1 },
  { pos: [0.4, -2.55, -0.4], r: 0.13, color: P.pinkDeep, roughness: 0.5, speed: 1.0, phase: 4.0 },
];

const ORIGIN = new THREE.Vector3(0, 0, 0);

function CameraFit({ mobile }: { mobile: boolean }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const halfW = mobile ? 3.7 : 4.05;
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const zForWidth = halfW / (Math.tan(fov / 2) * aspect);
    const zForHeight = 3.05 / Math.tan(fov / 2);
    camera.position.z = Math.max(zForWidth, zForHeight);
    camera.updateProjectionMatrix();
  }, [camera, size, mobile]);
  return null;
}

function Rig({ pointer, reduced, children }: { pointer: PointerRef; reduced: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    const idleY = reduced ? 0 : Math.sin(t * 0.2) * 0.05;
    const idleX = reduced ? 0 : Math.cos(t * 0.16) * 0.03;
    const k = Math.min(dt, 0.05);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, (reduced ? 0 : p.x * 0.24) + idleY, 2.2, k);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, (reduced ? 0 : -p.y * 0.16) + idleX, 2.2, k);
    g.position.x = THREE.MathUtils.damp(g.position.x, reduced ? 0 : p.x * 0.18, 2.2, k);
    g.position.y = THREE.MathUtils.damp(g.position.y, reduced ? 0 : p.y * 0.1, 2.2, k);
  });
  return <group ref={ref}>{children}</group>;
}

/** Wraps children in a group that drifts vertically with page scroll at the given speed. */
function Parallax({ speed, scroll, reduced, children }: { speed: number; scroll: ScrollRef; reduced: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const s = reduced ? 0 : (scroll.current ?? 0);
    ref.current.position.y = s * speed * 2.2;
  });
  return <group ref={ref}>{children}</group>;
}

function BrowserWindow({ scroll, reduced }: { scroll: ScrollRef; reduced: boolean }) {
  const { texture, dispose } = useMemo(() => createBrowserTexture(), []);
  useEffect(() => dispose, [dispose]);
  const shadow = useMemo(() => getShadowTexture(), []);

  return (
    <Parallax speed={0.75} scroll={scroll} reduced={reduced}>
      {/* Layered screens behind the window */}
      <Parallax speed={-0.25} scroll={scroll} reduced={reduced}>
        <Float speed={reduced ? 0 : 0.9} rotationIntensity={0.08} floatIntensity={0.35}>
          <RoundedBox args={[3.05, 2.05, 0.06]} radius={0.09} smoothness={5} position={[0.5, 0.42, -1.05]} rotation={[0, -0.12, -0.03]}>
            <meshPhysicalMaterial color={P.pink} roughness={0.55} clearcoat={0.4} clearcoatRoughness={0.4} />
          </RoundedBox>
        </Float>
      </Parallax>
      <Parallax speed={-0.12} scroll={scroll} reduced={reduced}>
        <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.08} floatIntensity={0.3}>
          <RoundedBox args={[3.1, 2.1, 0.06]} radius={0.09} smoothness={5} position={[-0.42, -0.4, -0.55]} rotation={[0, 0.08, 0.03]}>
            <meshPhysicalMaterial color={P.sand} roughness={0.4} clearcoat={0.5} clearcoatRoughness={0.3} />
          </RoundedBox>
        </Float>
      </Parallax>

      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.12} floatIntensity={0.45}>
        <group>
          <RoundedBox args={[3.24, 2.19, 0.09]} radius={0.1} smoothness={6}>
            <meshPhysicalMaterial color={P.cream2} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.25} />
          </RoundedBox>
          <mesh position={[0, 0, 0.0462]}>
            <planeGeometry args={[3.2, 2.16]} />
            <meshBasicMaterial map={texture} transparent toneMapped={false} />
          </mesh>
        </group>
      </Float>

      {/* Soft grounding shadow */}
      <sprite position={[0, -1.85, -0.4]} scale={[4.6, 1.15, 1]}>
        <spriteMaterial map={shadow} transparent opacity={0.55} depthWrite={false} />
      </sprite>
    </Parallax>
  );
}

function Orb({ def, scroll, reduced }: { def: OrbDef; scroll: ScrollRef; reduced: boolean }) {
  return (
    <Parallax speed={def.speed} scroll={scroll} reduced={reduced}>
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={0} floatIntensity={0.9}>
        <mesh position={def.pos}>
          <sphereGeometry args={[def.r, 48, 48]} />
          <meshPhysicalMaterial color={def.color} roughness={def.roughness} clearcoat={0.5} clearcoatRoughness={0.35} />
        </mesh>
      </Float>
    </Parallax>
  );
}

function Ring({ scroll, reduced }: { scroll: ScrollRef; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.08;
    ref.current.rotation.x = 1.15 + Math.sin(t * 0.3) * 0.08;
  });
  return (
    <Parallax speed={0.35} scroll={scroll} reduced={reduced}>
      <mesh ref={ref} rotation={[1.15, 0.2, 0]} position={[0.2, -0.1, -1.4]}>
        <torusGeometry args={[2.35, 0.022, 12, 200]} />
        <meshPhysicalMaterial color={P.sandDeep} roughness={0.35} metalness={0.15} clearcoat={0.6} />
      </mesh>
    </Parallax>
  );
}

function Node({ def, scroll, reduced }: { def: NodeDef; scroll: ScrollRef; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const line = useRef<any>(null);
  const base = useMemo(() => new THREE.Vector3(...def.pos), [def.pos]);
  const cur = useMemo(() => base.clone(), [base]);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const end = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = reduced ? 0 : clock.getElapsedTime();
    const s = reduced ? 0 : (scroll.current ?? 0);
    cur.set(
      base.x + Math.sin(t * 0.6 + def.phase) * 0.1,
      base.y + Math.cos(t * 0.8 + def.phase) * 0.14 + s * def.speed * 2.2,
      base.z + Math.sin(t * 0.45 + def.phase) * 0.08
    );
    group.current?.position.copy(cur);
    // the browser window itself drifts with scroll at 0.75
    end.set(0, s * 0.75 * 2.2, 0);
    mid.lerpVectors(cur, end, 0.5);
    mid.z += 0.45;
    line.current?.setPoints?.(cur, end, mid);
  });

  return (
    <>
      <QuadraticBezierLine
        ref={line}
        start={base}
        end={ORIGIN}
        mid={base.clone().multiplyScalar(0.5)}
        color={P.burgundy}
        lineWidth={1}
        transparent
        opacity={0.32}
        depthWrite={false}
      />
      <group ref={group} position={def.pos}>
        <mesh>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshPhysicalMaterial color={P.burgundy} roughness={0.35} clearcoat={0.8} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.15, 0.165, 40]} />
          <meshBasicMaterial color={P.burgundy} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <Html center distanceFactor={6.5} zIndexRange={[10, 0]} position={[0, -0.42, 0]} style={{ pointerEvents: "none" }}>
          <span className="chip select-none whitespace-nowrap">{def.label}</span>
        </Html>
      </group>
    </>
  );
}

function Scene({ pointer, scroll, reduced, mobile }: SceneProps) {
  const orbs = mobile ? ORBS.filter((o) => o.mobile) : ORBS;
  return (
    <>
      <CameraFit mobile={mobile} />
      <ambientLight intensity={0.85} color="#fff6ea" />
      <directionalLight position={[4, 6, 6]} intensity={1.3} color="#fff4e6" />
      <directionalLight position={[-6, -2, 3]} intensity={0.45} color="#f3d7d3" />
      <Rig pointer={pointer} reduced={reduced}>
        <BrowserWindow scroll={scroll} reduced={reduced} />
        <Ring scroll={scroll} reduced={reduced} />
        {orbs.map((o) => (
          <Orb key={o.color + o.r} def={o} scroll={scroll} reduced={reduced} />
        ))}
        {NODES.map((n) => (
          <Node key={n.label} def={n} scroll={scroll} reduced={reduced} />
        ))}
      </Rig>
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.6} color="#ffffff" position={[0, 6, -5]} scale={[14, 6, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={1.1} color="#f7e9dc" position={[-7, 2, 3]} scale={[8, 4, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={0.8} color="#e9cfcb" position={[7, -1, 3]} scale={[8, 4, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={0.6} color="#ffffff" position={[0, -6, 4]} scale={[10, 3, 1]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

export default function HeroScene({ pointer, scroll, active, reduced, mobile }: SceneProps & { active: boolean }) {
  return (
    <Canvas
      flat
      dpr={[1, mobile ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 9.5], fov: 36, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none", position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene pointer={pointer} scroll={scroll} reduced={reduced} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
