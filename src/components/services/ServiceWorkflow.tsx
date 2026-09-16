import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import type { WorkflowStep } from "@/lib/localServices";
import { Reveal } from "../ui/Reveal";

export function ServiceWorkflow({ steps, id }: { steps: WorkflowStep[]; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const line = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section aria-labelledby={`${id}-workflow-heading`} className="mt-16 border-t border-burgundy/10 pt-12 lg:mt-20">
      <Reveal>
        <p className="eyebrow">A thoughtful process</p>
        <h3 id={`${id}-workflow-heading`} className="mt-4 font-display text-[2rem] font-normal text-burgundy sm:text-[2.6rem]">
          How it <span className="display-italic">works.</span>
        </h3>
      </Reveal>
      <div ref={ref} className="relative mt-9">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-[21px] top-5 w-px bg-burgundy/15 lg:bottom-auto lg:left-[8%] lg:right-[8%] lg:h-px lg:w-auto">
          <motion.span className="absolute inset-0 origin-top bg-burgundy lg:hidden" style={{ scaleY: reduced ? 1 : line }} />
          <motion.span className="absolute inset-0 hidden origin-left bg-burgundy lg:block" style={{ scaleX: reduced ? 1 : line }} />
        </div>
        <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.06} amount={0.1}>
                <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy font-display text-sm text-cream shadow-[0_12px_24px_-12px_rgba(90,31,43,0.65)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1 lg:pt-3">
                    <h4 className="font-display text-[22px] font-medium text-burgundy">{step.title}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-brown-muted sm:text-sm">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}