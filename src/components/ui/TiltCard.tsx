import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Hover scale */
  scale?: number;
  glare?: boolean;
};

const spring = { stiffness: 190, damping: 22, mass: 0.7 };

export function TiltCard({ children, className, innerClassName, max = 8, scale = 1.015, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const disabled = touch || reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const s = useSpring(useTransform(hover, [0, 1], [1, scale]), spring);
  const glareOpacity = useSpring(useTransform(hover, [0, 1], [0, 1]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.14), rgba(255,255,255,0) 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  };
  const onEnter = () => {
    if (!disabled) hover.set(1);
  };
  const onLeave = () => {
    hover.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      ref={ref}
      className={cn("perspective", className)}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <motion.div
        className={cn("preserve-3d relative h-full will-change-transform", innerClassName)}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          scale: disabled ? 1 : s,
        }}
      >
        {children}
        {glare && !disabled && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
