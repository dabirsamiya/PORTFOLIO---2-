import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** A restrained trailing ring that complements (does not replace) the native cursor. */
export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHover(!!t?.closest?.("a, button, [role='button'], input, select, textarea, label, summary"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-multiply"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="rounded-full border border-burgundy"
        animate={{
          width: hover ? 44 : 26,
          height: hover ? 44 : 26,
          opacity: visible ? (hover ? 0.55 : 0.4) : 0,
          backgroundColor: hover ? "rgba(207,166,163,0.35)" : "rgba(207,166,163,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </motion.div>
  );
}
