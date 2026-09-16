import { useInView } from "framer-motion";
import { Suspense, lazy, useRef, type PointerEvent } from "react";
import { useIsMobile, useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";
import { Instagram } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const ShapesScene = lazy(() => import("./three/ShapesScene"));

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const inView = useInView(ref, { amount: 0.05 });
  const near = useInView(ref, { margin: "600px 0px 600px 0px" });
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const touch = useIsTouch();

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (touch || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="burgundy-vignette relative isolate flex min-h-[92svh] items-center overflow-hidden py-28 text-cream"
      aria-labelledby="final-heading"
    >
      <div className="absolute inset-0 -z-[5]" aria-hidden>
        {near && (
          <Suspense fallback={null}>
            <ShapesScene pointer={pointer} active={inView} reduced={reduced} mobile={mobile} variant="cta" />
          </Suspense>
        )}
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow-plain text-pink-light">Ready when you are</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="final-heading" className="display mt-6 font-display text-[3.1rem] font-normal leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-[5.4rem]">
              Your Next Customer Is <span className="display-italic text-pink-light">Already Online.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-cream/75 sm:text-xl">Make sure your business is ready when they find you.</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#contact" variant="light" size="lg" className="w-full sm:w-auto">
              Start a Conversation
            </Button>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream/80 transition hover:text-cream"
            >
              <Instagram className="h-4.5 w-4.5 text-pink-light" />
              {site.handle}
              <span aria-hidden className="h-px w-6 bg-cream/30 transition-colors group-hover:bg-pink-light" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
