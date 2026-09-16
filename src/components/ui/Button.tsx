import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, PointerEvent, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { scrollToId } from "@/lib/scroll";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "ghost" | "light" | "ghostLight" | "link";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  arrow?: boolean;
  ariaLabel?: string;
};

const sizes = {
  sm: "h-11 px-5 text-[11.5px]",
  md: "h-12 px-6 text-[12.5px]",
  lg: "h-14 px-8 text-[13px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-burgundy text-cream shadow-[0_18px_40px_-18px_rgba(90,31,43,0.75)] hover:bg-burgundy-deep hover:shadow-[0_24px_50px_-18px_rgba(90,31,43,0.85)] hover:-translate-y-0.5",
  ghost:
    "border border-burgundy/25 bg-transparent text-burgundy hover:border-burgundy/60 hover:bg-burgundy/[0.04] hover:-translate-y-0.5",
  light:
    "bg-cream text-burgundy shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] hover:bg-white hover:-translate-y-0.5",
  ghostLight:
    "border border-cream/35 bg-transparent text-cream hover:border-cream/70 hover:bg-cream/[0.06] hover:-translate-y-0.5",
  link: "h-auto px-0 text-burgundy hover:text-burgundy-deep",
};

const spring = { stiffness: 260, damping: 20, mass: 0.6 };

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  type = "button",
  arrow = true,
  ariaLabel,
}: Props) {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const magnetic = !touch && !reduced && variant !== "link";

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-semibold uppercase tracking-[0.16em] transition-[translate,box-shadow,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
    variant !== "link" && sizes[size],
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
      )}
    </>
  );

  const style = magnetic ? { x, y } : undefined;

  if (href) {
    const isAnchor = href.startsWith("#");
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      if (isAnchor) {
        e.preventDefault();
        scrollToId(href.slice(1));
      }
      onClick?.();
    };
    return (
      <motion.a
        href={href}
        onClick={handle}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        aria-label={ariaLabel}
        style={style}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {content}
    </motion.button>
  );
}
