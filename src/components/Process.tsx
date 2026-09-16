import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ComponentType, type SVGProps } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { Button } from "./ui/Button";
import { Compass, Layers, MapPin, Refresh, TrendUp } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Step = { n: string; title: string; text: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

const steps: Step[] = [
  { n: "01", title: "Discover", text: "Understand your business, audience and goals.", Icon: Compass },
  { n: "02", title: "Build", text: "Create the digital experience.", Icon: Layers },
  { n: "03", title: "Optimize", text: "Strengthen your Google presence.", Icon: MapPin },
  { n: "04", title: "Reactivate", text: "Bring inactive customers back.", Icon: Refresh },
  { n: "05", title: "Grow", text: "Improve the customer journey.", Icon: TrendUp },
];

function Node({ step, index, progress, reduced, horizontal }: { step: Step; index: number; progress: MotionValue<number>; reduced: boolean; horizontal: boolean }) {
  const th = 0.08 + index * 0.2;
  const scaleMV = useTransform(progress, [th - 0.1, th], [0.6, 1]);
  const opacityMV = useTransform(progress, [th - 0.12, th], [0.3, 1]);
  const scale = reduced ? 1 : scaleMV;
  const opacity = reduced ? 1 : opacityMV;

  const disc = (
    <motion.div
      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream shadow-[0_24px_40px_-18px_rgba(90,31,43,0.8)]"
      style={{ scale }}
    >
      <span className="absolute inset-0 rounded-full border border-burgundy/40 animate-pulse-ring [animation-duration:3.4s]" />
      <span className="absolute -inset-1.5 rounded-full border border-pink/60" />
      <step.Icon className="relative h-6 w-6" />
    </motion.div>
  );

  if (horizontal) {
    return (
      <motion.div className="flex flex-col items-center px-3 text-center" style={{ opacity }}>
        {disc}
        <span className="mt-7 font-display text-[13px] font-medium tracking-[0.3em] text-pink-deep">{step.n}</span>
        <h3 className="mt-2 font-display text-[1.5rem] font-medium text-burgundy">{step.title}</h3>
        <p className="mt-2 max-w-[210px] text-[14.5px] leading-relaxed text-brown-muted">{step.text}</p>
      </motion.div>
    );
  }

  return (
    <motion.div className="flex items-start gap-5" style={{ opacity }}>
      {disc}
      <div className="pt-2">
        <span className="font-display text-[12px] font-medium tracking-[0.3em] text-pink-deep">{step.n}</span>
        <h3 className="mt-1 font-display text-[1.4rem] font-medium text-burgundy">{step.title}</h3>
        <p className="mt-1.5 text-[15px] text-brown-muted">{step.text}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 62%"] });
  const lineMV = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);
  const line = reduced ? 1 : lineMV;

  return (
    <section id="process" className="relative overflow-hidden bg-sand py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Process"
          align="center"
          title={
            <>
              From Idea To <span className="display-italic">Customer.</span>
            </>
          }
          subtitle="A clear, practical path — so you always know what is happening, and why."
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <div className="relative hidden lg:block">
            <div className="absolute left-[10%] right-[10%] top-8 h-px bg-burgundy/15" />
            <motion.div className="absolute left-[10%] right-[10%] top-8 h-px origin-left bg-burgundy" style={{ scaleX: line }} />
            <div className="relative grid grid-cols-5">
              {steps.map((s, i) => (
                <Node key={s.n} step={s} index={i} progress={scrollYProgress} reduced={reduced} horizontal />
              ))}
            </div>
          </div>

          <div className="relative lg:hidden">
            <div className="absolute bottom-8 left-8 top-8 w-px bg-burgundy/15" />
            <motion.div className="absolute bottom-8 left-8 top-8 w-px origin-top bg-burgundy" style={{ scaleY: line }} />
            <div className="relative space-y-10">
              {steps.map((s, i) => (
                <Node key={s.n} step={s} index={i} progress={scrollYProgress} reduced={reduced} horizontal={false} />
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center lg:mt-24">
          <Button href="#contact" size="lg">
            Get a Free Consultation
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
