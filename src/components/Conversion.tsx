import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Suspense, lazy, useRef, type PointerEvent } from "react";
import { useIsMobile, useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { whatsappLink } from "@/lib/site";
import { Button } from "./ui/Button";
import { MapPin, Monitor, Refresh } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const ShapesScene = lazy(() => import("./three/ShapesScene"));

const statement = "Start Getting More From The Customers You Already Have.";
const accentWords = new Set(["Already", "Have."]);

function Word({ progress, range, children, accent, reduced }: { progress: MotionValue<number>; range: [number, number]; children: string; accent: boolean; reduced: boolean }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span style={{ opacity: reduced ? 1 : opacity }} className={accent ? "display-italic text-pink-light" : "text-cream"}>
        {children}
      </motion.span>
    </span>
  );
}

const lines = [
  { Icon: Monitor, text: "A strong website gets attention." },
  { Icon: MapPin, text: "A strong Google presence gets discovered." },
  { Icon: Refresh, text: "A smart reactivation process brings customers back." },
];

export function Conversion() {
  const section = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const touch = useIsTouch();
  const inView = useInView(section, { amount: 0.05 });
  const near = useInView(section, { margin: "500px 0px 500px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = statement.split(" ");

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (touch || !section.current) return;
    const r = section.current.getBoundingClientRect();
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section ref={section} onPointerMove={onMove} className="burgundy-vignette relative isolate overflow-hidden py-32 text-cream lg:py-44" aria-labelledby="shift-heading">
      <div className="absolute inset-0 -z-[5]" aria-hidden>
        {near && (
          <Suspense fallback={null}>
            <ShapesScene pointer={pointer} active={inView} reduced={reduced} mobile={mobile} variant="statement" />
          </Suspense>
        )}
      </div>

      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow text-pink-light before:bg-pink-light/60">The shift</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="shift-heading" className="display mt-5 font-display text-[2.3rem] font-normal tracking-[-0.02em] text-cream/70 sm:text-5xl lg:text-[3.5rem]">
            Stop Chasing Every New Customer.
          </h2>
        </Reveal>

        <div ref={ref} className="mt-8 lg:mt-12">
          <p className="display max-w-6xl font-display text-[2.8rem] font-normal leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-[5.6rem]">
            {words.map((w, i) => (
              <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accentWords.has(w)} reduced={reduced}>
                {w}
              </Word>
            ))}
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <ul className="space-y-4 lg:col-span-7">
            {lines.map((l, i) => (
              <Reveal key={l.text} delay={i * 0.1}>
                <li className="flex items-center gap-4 text-lg text-cream/85 sm:text-xl">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-cream/[0.06] text-pink-light">
                    <l.Icon className="h-4.5 w-4.5" />
                  </span>
                  {l.text}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.25} className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <Button href={whatsappLink()} external variant="light" size="lg">
                Talk To Samya
              </Button>
              <span className="text-[12px] uppercase tracking-[0.22em] text-cream/55">Replies personally on WhatsApp</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
