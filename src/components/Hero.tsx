import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Suspense, lazy, useRef, type PointerEvent } from "react";
import { useIsTouch, useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { industries } from "@/lib/site";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

const HeroScene = lazy(() => import("./three/HeroScene"));

const ease = [0.16, 1, 0.3, 1] as const;

function Word({ children, delay, className = "" }: { children: string; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
      <motion.span
        className={`inline-block will-change-transform ${className}`}
        initial={{ y: "112%", rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.2, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const inView = useInView(ref, { amount: 0.05 });
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();
  const desktop = useMediaQuery("(min-width: 1024px)", true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (touch || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section id="top" ref={ref} onPointerMove={onMove} className="relative isolate min-h-[100svh] overflow-hidden" aria-label="Introduction">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(231,209,206,0.55),transparent_70%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(220,203,184,0.5),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
      </div>

      {/* 3D composition — desktop */}
      {desktop && (
        <div className="absolute inset-y-0 right-[-3%] isolate w-[57%] xl:right-0 xl:w-[55%]" aria-hidden>
          <Suspense fallback={null}>
            <HeroScene pointer={pointer} scroll={scrollRef} active={inView} reduced={reduced} mobile={false} />
          </Suspense>
        </div>
      )}

      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pb-16 pt-32 lg:pt-36">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="eyebrow"
          >
            Samya Digital Agency
          </motion.p>

          <h1 className="display mt-7 font-display text-[3.6rem] font-normal leading-[0.96] tracking-[-0.025em] text-brown sm:text-7xl xl:text-[5.9rem]">
            <span className="block">
              <Word delay={0.3}>Your</Word> <Word delay={0.38}>Business.</Word>
            </span>
            <span className="relative mt-1 block text-burgundy">
              <Word delay={0.48} className="display-italic text-[1.06em]">
                Better
              </Word>{" "}
              <span className="relative inline-block">
                <Word delay={0.56} className="display-italic text-[1.06em]">
                  Online.
                </Word>
                <svg aria-hidden viewBox="0 0 200 14" className="absolute -bottom-1 left-0 h-[0.14em] w-full overflow-visible" fill="none">
                  <motion.path
                    d="M3 10 C 50 3, 120 2, 197 8"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className="text-pink"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 1, ease }}
                  />
                </svg>
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="mt-8 max-w-[520px] text-lg leading-relaxed text-brown-muted sm:text-[1.2rem]"
          >
            We build high-converting websites, strengthen your Google presence, and help you bring inactive customers back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.95 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#contact" size="lg" className="w-full sm:w-auto">
              Get a Free Consultation
            </Button>
            <Button href="#work" variant="ghost" size="lg" className="w-full sm:w-auto">
              View Our Work
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-brown-muted"
            aria-label="What we do"
          >
            {["Websites", "Google Business Profile", "Customer Reactivation"].map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-pink-deep" aria-hidden />}
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 3D composition — mobile / tablet */}
        {!desktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="relative -mx-5 mt-8 h-[380px] sm:-mx-8 sm:h-[440px]"
            aria-hidden
          >
            <Suspense fallback={null}>
              <HeroScene pointer={pointer} scroll={scrollRef} active={inView} reduced={reduced} mobile />
            </Suspense>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-hidden
        className="absolute bottom-8 left-5 hidden items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-brown-muted/70 sm:left-8 lg:left-10 lg:flex"
      >
        <span className="relative h-12 w-px overflow-hidden bg-burgundy/15">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-burgundy animate-scroll-hint" />
        </span>
        Scroll
      </motion.div>
    </section>
  );
}

const statement = "Digital experiences designed to make businesses look better, get discovered and bring customers back.";

export function IntroStrip() {
  const words = statement.split(" ");
  const items = [...industries, ...industries];
  return (
    <section className="relative bg-sand py-16 lg:py-20" aria-label="Introduction statement">
      <div className="container-x">
        <motion.p
          className="display mx-auto max-w-4xl text-center font-display text-[1.7rem] font-normal leading-[1.25] tracking-[-0.01em] text-burgundy sm:text-4xl lg:text-[2.75rem]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className={`mr-[0.28em] inline-block ${["better,", "discovered", "back."].includes(w) ? "display-italic text-burgundy-light" : ""}`}
              variants={{ hidden: { opacity: 0, y: 14, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </motion.p>
      </div>
      <Reveal delay={0.3} className="mt-12">
        <p className="mb-4 text-center text-[10.5px] font-semibold uppercase tracking-[0.3em] text-burgundy/60">Built for local businesses like</p>
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {items.map((it, i) => (
              <span
                key={`${it}-${i}`}
                className="flex items-center pr-12 font-display text-[16px] font-normal uppercase tracking-[0.24em] text-burgundy/75"
                aria-hidden={i >= industries.length}
              >
                {it}
                <span className="ml-12 h-1.5 w-1.5 rounded-full bg-pink-deep" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
