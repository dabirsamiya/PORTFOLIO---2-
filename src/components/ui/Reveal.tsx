import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
  once?: boolean;
};

export function Reveal({ children, delay = 0, className, style, amount = 0.25, once = true }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </motion.div>
  );
}
