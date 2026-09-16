import type { ComponentType } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { MapPin, Search, StarSolid } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

function WebsiteVisual() {
  return (
    <>
      <div className="absolute inset-x-7 top-7 rounded-t-xl border border-burgundy/10 bg-cream-2 shadow-[0_30px_50px_-30px_rgba(90,31,43,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-burgundy/8 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-sand" />
          <span className="h-2 w-2 rounded-full bg-sand" />
          <span className="h-2 w-2 rounded-full bg-sand" />
          <span className="ml-2 h-3 flex-1 rounded-sm bg-sand-light" />
        </div>
        <div className="space-y-2 p-4 opacity-80">
          <div className="h-2.5 w-2/3 rounded bg-sand-deep/60" />
          <div className="h-2 w-1/2 rounded bg-sand" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-9 rounded bg-sand-light" />
            <div className="h-9 rounded bg-sand-light" />
            <div className="h-9 rounded bg-sand-light" />
          </div>
        </div>
      </div>
      <span className="chip absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">Slow · Not mobile-friendly</span>
    </>
  );
}

function SearchVisual() {
  return (
    <div className="absolute inset-x-7 top-6 space-y-2">
      <div className="flex items-center gap-2 rounded-full border border-burgundy/10 bg-cream-2 px-3.5 py-2 text-[12px] text-brown">
        <Search className="h-3.5 w-3.5 text-brown-muted" />
        salon near me
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-burgundy/8 bg-cream-2/80 px-3 py-2">
          <MapPin className="h-3.5 w-3.5 text-burgundy" />
          <span className="h-2 flex-1 rounded bg-sand" />
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <StarSolid key={s} className="h-2.5 w-2.5 text-pink-deep" />
            ))}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-burgundy/25 px-3 py-2">
        <MapPin className="h-3.5 w-3.5 text-brown-muted/70" />
        <span className="text-[11px] tracking-wide text-brown-muted">Your business — not showing</span>
      </div>
    </div>
  );
}

function LostVisual() {
  const people = ["A", "M", "S", "R", "K"];
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center gap-2.5 pb-6">
        {people.map((l, i) => (
          <div
            key={l}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border text-[12px] font-semibold",
              i < 2 ? "border-burgundy/30 bg-pink-light text-burgundy" : "border-dashed border-burgundy/25 text-brown-muted"
            )}
            style={{ opacity: i < 2 ? 1 : 1 - (i - 1) * 0.22 }}
          >
            {l}
          </div>
        ))}
      </div>
      <span className="chip absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">No follow-up · No return visit</span>
    </>
  );
}

const problems: { n: string; title: string; text: string; Visual: ComponentType }[] = [
  { n: "01", title: "Outdated Website", text: "Your website is often the first impression. Make it count.", Visual: WebsiteVisual },
  { n: "02", title: "Weak Google Presence", text: "Customers search locally before they decide where to go.", Visual: SearchVisual },
  { n: "03", title: "Lost Customers", text: "Previous customers can become repeat customers — if you have a system.", Visual: LostVisual },
];

export function Problem() {
  return (
    <section id="problem" className="relative bg-cream py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Your Customers Are <span className="display-italic">Already</span> Looking.
            </>
          }
          subtitle="But are they finding the right business?"
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
          {problems.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1} className="h-full">
              <TiltCard className="h-full" innerClassName="rounded-3xl" max={7}>
                <article className="card-sand card-hover preserve-3d flex h-full flex-col p-6 lg:p-7">
                  <div className="relative h-44 overflow-hidden rounded-2xl border border-burgundy/8 bg-cream" style={{ transform: "translateZ(34px)" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,209,206,0.6),transparent_60%)]" />
                    <p.Visual />
                  </div>
                  <div className="mt-8 flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                    <span className="font-display text-[14px] font-medium tracking-[0.2em] text-pink-deep">{p.n}</span>
                    <span className="h-px flex-1 bg-burgundy/10" />
                  </div>
                  <h3 className="mt-4 font-display text-[1.55rem] font-medium leading-tight text-burgundy" style={{ transform: "translateZ(24px)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-brown-muted" style={{ transform: "translateZ(16px)" }}>
                    {p.text}
                  </p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-5 border-t border-burgundy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-brown-muted">
            Most local businesses have at least one of these gaps — and rarely know which one is costing them the most.
          </p>
          <Button href="#contact" variant="ghost">
            Find my biggest gap
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
