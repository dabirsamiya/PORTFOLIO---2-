import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
  tone?: "dark" | "light";
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", className, size = "md", tone = "dark", id }: Props) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span className={cn(align === "center" ? "eyebrow-plain" : "eyebrow", light && "text-pink-light before:bg-pink-light/60")}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={cn(
            "display mt-5 font-display font-normal leading-[1.02] tracking-[-0.02em]",
            light ? "text-cream" : "text-burgundy",
            size === "lg" ? "text-[2.9rem] sm:text-6xl lg:text-[4.75rem]" : "text-[2.5rem] sm:text-5xl lg:text-[3.75rem]"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl", light ? "text-cream/75" : "text-brown-muted")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
