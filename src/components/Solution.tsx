import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ComponentType, type SVGProps } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { Button } from "./ui/Button";
import { Check, Heart, MapPin, Monitor, Refresh } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Stage = { key: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; x: number; y: number };

const W = 500;
const H = 400;
const C = { x: 250, y: 200 };

const stages: Stage[] = [
  { key: "website", label: "Website", Icon: Monitor, x: 250, y: 50 },
  { key: "gbp", label: "Google Business Profile", Icon: MapPin, x: 428, y: 200 },
  { key: "reactivation", label: "Customer Reactivation", Icon: Refresh, x: 250, y: 350 },
  { key: "repeat", label: "Repeat Customers", Icon: Heart, x: 72, y: 200 },
];

const arcs = ["M250 50 Q 428 50 428 200", "M428 200 Q 428 350 250 350", "M250 350 Q 72 350 72 200", "M72 200 Q 72 50 250 50"];

function useRange(progress: MotionValue<number>, from: number, to: number, out: [number, number] = [0, 1], reduced = false) {
  const v = useTransform(progress, [from, to], out);
  return reduced ? out[1] : v;
}

function DrawPath({ d, progress, range, reduced, dashed }: { d: string; progress: MotionValue<number>; range: [number, number]; reduced: boolean; dashed?: boolean }) {
  const pathLength = useRange(progress, range[0], range[1], [0, 1], reduced);
  const flowOpacity = useRange(progress, range[1] - 0.02, range[1] + 0.06, [0, 1], reduced);
  return (
    <>
      <motion.path d={d} stroke="rgba(90,31,43,0.22)" strokeWidth={1.2} fill="none" vectorEffect="non-scaling-stroke" style={{ pathLength }} strokeDasharray={dashed ? "4 6" : undefined} />
      {!dashed && (
        <motion.path
          d={d}
          stroke="#5a1f2b"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3 13"
          vectorEffect="non-scaling-stroke"
          className="animate-dash"
          style={{ opacity: flowOpacity }}
        />
      )}
    </>
  );
}

function StageNode({ stage, index, progress, reduced }: { stage: Stage; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const start = 0.34 + index * 0.05;
  const opacity = useRange(progress, start, start + 0.1, [0, 1], reduced);
  const scale = useRange(progress, start, start + 0.12, [0.7, 1], reduced);
  return (
    <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(stage.x / W) * 100}%`, top: `${(stage.y / H) * 100}%`, opacity, scale }}>
      <div className="flex items-center gap-3 rounded-2xl border border-burgundy/10 bg-cream-2 py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-20px_rgba(90,31,43,0.45)]">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-light text-burgundy">
          <stage.Icon className="h-4.5 w-4.5" />
        </span>
        <span className="whitespace-nowrap text-[12.5px] font-semibold uppercase tracking-[0.14em] text-burgundy">{stage.label}</span>
      </div>
    </motion.div>
  );
}

function Hub({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const scale = useRange(progress, 0, 0.14, [0.6, 1], reduced);
  const opacity = useRange(progress, 0, 0.12, [0, 1], reduced);
  return (
    <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ scale, opacity }}>
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full sm:h-40 sm:w-40">
        <span className="absolute inset-0 rounded-full border border-burgundy/25 animate-pulse-ring [animation-duration:3.4s]" />
        <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(207,166,163,0.45),transparent_70%)]" />
        <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-burgundy text-cream shadow-[0_30px_60px_-20px_rgba(90,31,43,0.7)] sm:h-32 sm:w-32">
          <span className="text-[8.5px] font-semibold uppercase tracking-[0.3em] text-pink-light">Center</span>
          <span className="mt-1 text-center font-display text-[15px] font-medium leading-tight tracking-[0.06em]">
            YOUR
            <br />
            BUSINESS
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Diagram({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "center 40%"] });
  return (
    <div ref={ref} className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {stages.map((s, i) => (
          <DrawPath key={s.key} d={`M${C.x} ${C.y} L${s.x} ${s.y}`} progress={scrollYProgress} range={[0.1 + i * 0.05, 0.3 + i * 0.05]} reduced={reduced} />
        ))}
        {arcs.map((d, i) => (
          <DrawPath key={d} d={d} progress={scrollYProgress} range={[0.48 + i * 0.12, 0.6 + i * 0.12]} reduced={reduced} dashed={i === 3} />
        ))}
      </svg>
      <Hub progress={scrollYProgress} reduced={reduced} />
      {stages.map((s, i) => (
        <StageNode key={s.key} stage={s} index={i} progress={scrollYProgress} reduced={reduced} />
      ))}
    </div>
  );
}

function MobileFlow({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const scaleY = useRange(scrollYProgress, 0, 1, [0, 1], reduced);
  return (
    <div ref={ref} className="relative pl-9">
      <div className="absolute bottom-6 left-[15px] top-6 w-px bg-burgundy/15" />
      <motion.div className="absolute bottom-6 left-[15px] top-6 w-px origin-top bg-burgundy" style={{ scaleY }} />
      <div className="relative mb-4">
        <span className="absolute -left-9 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy shadow-[0_10px_24px_-8px_rgba(90,31,43,0.7)]">
          <span className="h-2 w-2 rounded-full bg-cream" />
        </span>
        <div className="rounded-2xl bg-burgundy px-4 py-3 text-cream">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-pink-light">Center</span>
          <p className="font-display text-[16px] font-medium tracking-[0.06em]">YOUR BUSINESS</p>
        </div>
      </div>
      {stages.map((s) => (
        <div key={s.key} className="relative mb-4 last:mb-0">
          <span className="absolute -left-9 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-burgundy/20 bg-cream-2">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-burgundy/10 bg-cream-2 py-3 pl-3 pr-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-light text-burgundy">
              <s.Icon className="h-4.5 w-4.5" />
            </span>
            <span className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-burgundy">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const points = [
  "One connected system instead of scattered tools",
  "Every touchpoint leads to a call, message or booking",
  "Built around how your customers actually behave",
];

export function Solution() {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="solution" className="relative overflow-hidden bg-sand py-28 lg:py-40">
      <div aria-hidden className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,241,232,0.7),transparent_70%)]" />
      </div>
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The solution"
            title={
              <>
                We Build The System <span className="display-italic">Behind</span> The Experience.
              </>
            }
            subtitle="Your website, Google presence and customer follow-up shouldn't operate separately. We connect the important parts of your customer journey."
          />
          <Reveal delay={0.2}>
            <ul className="mt-9 space-y-3.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15.5px] text-brown">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream">
                    <Check className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact">Get a Free Consultation</Button>
            <Button href="#services" variant="ghost" arrow={false}>
              Explore the services
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="hidden md:block">
            <Diagram reduced={reduced} />
          </div>
          <div className="md:hidden">
            <MobileFlow reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
