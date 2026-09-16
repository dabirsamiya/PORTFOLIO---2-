import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { Layers, StarSolid } from "../ui/Icons";

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    if (!inView || reduced) {
      if (ref.current) ref.current.textContent = formatted;
      return;
    }

    // Update only the visual number; assistive technology gets the final value.
    const controls = animate(0, value, {
      duration: 1.25,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals, prefix, suffix, delay, formatted]);

  return (
    <span className="tabular-nums">
      <span className="sr-only">{formatted}</span>
      <span ref={ref} aria-hidden="true">{formatted}</span>
    </span>
  );
}

export function StarRating({ rating = 5, className }: { rating?: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars, demo rating`}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="relative block h-4 w-4"
          initial={reduced ? false : { opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.07 }}
        >
          <StarSolid className="h-4 w-4 text-sand" />
          <span
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${Math.min(1, Math.max(0, rating - index)) * 100}%` }}
          >
            <StarSolid className="h-4 w-4 max-w-none text-burgundy" />
          </span>
        </motion.span>
      ))}
    </span>
  );
}

export function DemoNotice({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold uppercase text-burgundy",
        compact ? "text-[9px] tracking-[0.17em]" : "text-[10px] tracking-[0.2em]"
      )}
    >
      <span>Concept dashboard</span>
      <span aria-hidden="true">&mdash;</span>
      <span className="border-b border-burgundy/35">Demo data</span>
    </p>
  );
}

export function DemoMetric({
  label,
  value,
  suffix,
  prefix,
  compact = false,
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  compact?: boolean;
  delay?: number;
}) {
  return (
    <div className="min-w-0">
      <dt className={cn("font-medium text-brown-muted", compact ? "text-[10px] leading-snug" : "text-xs sm:text-[13px]")}>
        {label}
      </dt>
      <dd className={cn("mt-1.5 font-display font-medium leading-none text-burgundy", compact ? "text-[25px]" : "text-[32px] sm:text-[38px]")}>
        <CountUp value={value} prefix={prefix} suffix={suffix} delay={delay} />
      </dd>
    </div>
  );
}

export function DashboardFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card overflow-hidden !rounded-2xl" data-demo-dashboard="true">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-burgundy/10 bg-cream px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-light text-burgundy">
            <Layers className="h-4 w-4" />
          </span>
          <p className="font-sans text-[13px] font-semibold text-burgundy">{title}</p>
        </div>
        <DemoNotice />
      </div>
      {children}
      <p className="border-t border-burgundy/10 bg-cream px-5 py-4 text-[11px] leading-relaxed text-brown-muted sm:px-7 sm:text-xs">
        All figures, business details, and customer feedback in this concept are fictional demonstration data.
        Not client results, a live Google dashboard, or a performance guarantee.
      </p>
    </div>
  );
}

export function DashboardPreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="preserve-3d relative flex h-full w-full items-center justify-center py-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-[9%] top-[18%] h-[63%] rounded-2xl border border-burgundy/10 bg-pink-light"
        style={{ transform: "translateZ(-24px) rotate(-4deg)" }}
      />
      <div
        className="relative w-[96%] max-w-[430px] overflow-hidden rounded-2xl border border-burgundy/10 bg-cream-2 shadow-[0_36px_70px_-35px_rgba(90,31,43,0.6)]"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="border-b border-burgundy/10 bg-cream px-4 py-3 sm:px-5"><DemoNotice compact /></div>
        {children}
        <p className="border-t border-burgundy/10 px-4 py-2.5 text-[10px] text-brown-muted sm:px-5">
          Illustrative values only. Not client results.
        </p>
      </div>
    </div>
  );
}