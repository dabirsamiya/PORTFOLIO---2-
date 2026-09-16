import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { MapPin, Message, Refresh, Smartphone, Target, Wrench, Zap } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

type Reason = { title: string; text: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; wide?: boolean };

const reasons: Reason[] = [
  { title: "Built Around Your Business", text: "Every decision starts with how your customers find and choose you — not with a template.", Icon: Target, wide: true },
  { title: "Mobile-First", text: "Designed for the phone in your customer's hand first, then scaled up.", Icon: Smartphone },
  { title: "Conversion-Focused", text: "Clear next steps that turn visitors into calls, messages and bookings.", Icon: Zap },
  { title: "Google Business Profile Support", text: "Your profile built, optimized and kept up to date.", Icon: MapPin },
  { title: "Customer Reactivation Systems", text: "Structured follow-ups that bring past customers back.", Icon: Refresh },
  { title: "Direct Communication", text: "You talk to the person doing the work. No middle layers.", Icon: Message },
  { title: "Practical Digital Solutions", text: "No jargon, no bloat — only what moves your business forward.", Icon: Wrench },
];

function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
      <motion.circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="#cfa6a3"
        strokeWidth="1.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      <motion.path
        d="m7 12.5 3.5 3.5L17 9"
        stroke="#5a1f2b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, delay: delay + 0.45, ease: "easeOut" }}
      />
    </svg>
  );
}

export function WhySamya() {
  return (
    <section className="relative bg-cream py-28 lg:py-40" aria-labelledby="why-heading">
      <div className="container-x">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Samya"
          title={
            <>
              Not Just Another <span className="display-italic">Digital</span> Agency.
            </>
          }
          subtitle="We care less about looking impressive and more about what actually makes customers call, message and book."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 0.08} className={cn("h-full", r.wide && "md:col-span-2")}>
              <TiltCard className="h-full" innerClassName="rounded-3xl" max={6}>
                <article className="card card-hover preserve-3d flex h-full flex-col p-6 lg:p-7">
                  <div className="flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-light text-pink-deep">
                      <r.Icon className="h-5 w-5" />
                    </span>
                    <AnimatedCheck delay={0.15 + (i % 4) * 0.1} />
                  </div>
                  <h3
                    className={cn("mt-8 font-display font-medium leading-tight text-burgundy", r.wide ? "text-[1.7rem] lg:text-[2rem]" : "text-[1.3rem]")}
                    style={{ transform: "translateZ(22px)" }}
                  >
                    {r.title}
                  </h3>
                  <p className={cn("mt-3 text-[14.5px] leading-relaxed text-brown-muted", r.wide && "max-w-md text-[15.5px]")} style={{ transform: "translateZ(14px)" }}>
                    {r.text}
                  </p>
                </article>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={0.2} className="md:col-span-2 lg:col-span-4">
            <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-burgundy p-7 text-cream lg:flex-row lg:items-center lg:justify-between lg:p-9">
              <div aria-hidden className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(207,166,163,0.35),transparent_65%)]" />
              <div className="relative">
                <p className="display font-display text-[1.7rem] font-normal leading-tight lg:text-[2rem]">
                  Let's talk about what your business <span className="display-italic text-pink-light">actually needs.</span>
                </p>
                <p className="mt-2 text-[15px] text-cream/70">A short conversation is enough to find the biggest opportunity.</p>
              </div>
              <div className="relative shrink-0">
                <Button href="#contact" variant="light" size="lg" className="w-full sm:w-auto">
                  Get a Free Consultation
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
