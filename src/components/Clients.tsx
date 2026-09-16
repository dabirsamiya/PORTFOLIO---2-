import type { ComponentType } from "react";
import { ayeshaDesktop, ayeshaMobile, spaDesktop, spaMobile } from "@/lib/clientPreviews";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { ArrowUpRight, Globe, Heart, MapPin, Phone } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

const imgTransition = "transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]";

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

function SiteVisual({ desktop, mobile, domain, name }: { desktop: string; mobile: string; domain: string; name: string }) {
  return (
    <>
      {/* Panel + desktop window (clipped for an editorial bleed) */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-sand-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(231,209,206,0.85),transparent_60%)]" />
        <div className="absolute left-[7%] right-[-8%] top-[15%] overflow-hidden rounded-xl border border-burgundy/10 bg-cream-2 shadow-[0_40px_70px_-30px_rgba(90,31,43,0.6)]">
          <div className="flex items-center gap-1.5 border-b border-burgundy/8 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            <span className="h-1.5 w-1.5 rounded-full bg-sand" />
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
            <span className="ml-3 flex h-4 items-center gap-1 rounded-sm bg-cream-3 px-2 text-[9px] text-brown-muted">
              <Globe className="h-2.5 w-2.5" />
              {domain}
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={desktop}
              alt={`${name} website — homepage on desktop`}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className={cn("h-full w-full object-cover object-top", imgTransition)}
            />
          </div>
        </div>
      </div>

      {/* Mobile layer — real depth, outside the clipped panel */}
      <div
        className="absolute bottom-[-3%] right-[5%] w-[26%] overflow-hidden rounded-[1.1rem] border-[3px] border-burgundy-deep bg-burgundy-deep shadow-[0_34px_50px_-22px_rgba(62,21,32,0.75)]"
        style={{ transform: "translateZ(46px)", aspectRatio: "390 / 844" }}
      >
        <span className="absolute left-1/2 top-1 z-10 h-1 w-7 -translate-x-1/2 rounded-full bg-burgundy-deep" />
        <img
          src={mobile}
          alt={`${name} website — homepage on mobile`}
          width={390}
          height={844}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-[0.85rem] object-cover object-top"
        />
      </div>
    </>
  );
}

const actions = [
  { l: "Call", I: Phone },
  { l: "Directions", I: MapPin },
  { l: "Website", I: Globe },
  { l: "Save", I: Heart },
];

function ProfileVisual() {
  return (
    <>
      {/* Map panel */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-sand-light">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "linear-gradient(rgba(90,31,43,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(90,31,43,0.07) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <span className="absolute -left-6 top-[30%] h-2 w-[130%] rotate-[-8deg] bg-cream-2" />
        <span className="absolute left-[44%] -top-6 h-[140%] w-2 rotate-[16deg] bg-cream-2" />
        <span className="absolute -left-6 top-[68%] h-1.5 w-[130%] rotate-[5deg] bg-cream-2/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,209,206,0.55),transparent_65%)]" />
      </div>

      {/* Pin */}
      <div className="absolute left-[62%] top-[34%] -translate-x-1/2 -translate-y-1/2" style={{ transform: "translate(-50%, -50%) translateZ(30px)" }}>
        <span className="absolute left-1/2 top-[72%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy/50 animate-pulse-ring" />
        <MapPin className="relative h-14 w-14 text-burgundy drop-shadow-[0_14px_16px_rgba(90,31,43,0.35)]" strokeWidth={1.6} />
      </div>

      {/* Profile card */}
      <div
        className="absolute bottom-[6%] left-[6%] w-[68%] rounded-2xl border border-burgundy/10 bg-cream-2 p-3.5 shadow-[0_34px_60px_-26px_rgba(90,31,43,0.6)]"
        style={{ transform: "translateZ(50px)" }}
      >
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.26em] text-pink-deep">Google Business Profile</p>
        <p className="mt-1 font-display text-[14.5px] font-medium leading-tight text-burgundy">Russian Home &amp; Hotel Spa Service</p>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {actions.map(({ l, I }) => (
            <span key={l} className="flex flex-col items-center gap-1 rounded-lg border border-burgundy/8 bg-cream py-1.5 text-[7.5px] font-semibold uppercase tracking-[0.12em] text-brown">
              <I className="h-3 w-3 text-burgundy" />
              {l}
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          <span className="h-8 rounded-md bg-[linear-gradient(160deg,#dccbb8,#ede3d6)]" />
          <span className="h-8 rounded-md bg-[linear-gradient(200deg,#cfa6a3,#e7d1ce)]" />
          <span className="h-8 rounded-md bg-[linear-gradient(140deg,#c6b097,#dccbb8)]" />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Client = {
  n: string;
  name: string;
  category: string;
  meta: string;
  chip: string;
  href: string;
  cta: string;
  Visual: ComponentType;
  wide?: boolean;
};

const clients: Client[] = [
  {
    n: "01",
    name: "Ayesha Salon & Academy",
    category: "Website Development",
    meta: "ayeshasalon.com",
    chip: "Live website",
    href: "https://ayeshasalon.com/",
    cta: "View Website",
    Visual: () => <SiteVisual desktop={ayeshaDesktop} mobile={ayeshaMobile} domain="ayeshasalon.com" name="Ayesha Salon & Academy" />,
  },
  {
    n: "02",
    name: "Russian Home & Hotel Spa Service",
    category: "Website Development",
    meta: "russian-home-hotel-spa.vercel.app",
    chip: "Live website",
    href: "https://russian-home-hotel-spa.vercel.app/",
    cta: "View Website",
    Visual: () => (
      <SiteVisual desktop={spaDesktop} mobile={spaMobile} domain="russian-home-hotel-spa.vercel.app" name="Russian Home & Hotel Spa Service" />
    ),
  },
  {
    n: "03",
    name: "Google Business Profile",
    category: "Google Business Profile / Local Presence",
    meta: "Business Profile on Google",
    chip: "Live profile",
    href: "https://share.google/YFzEyTJgpY47tJG3G",
    cta: "View Profile",
    Visual: ProfileVisual,
    wide: true,
  },
];

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function ClientCard({ c }: { c: Client }) {
  return (
    <TiltCard max={6} scale={1.01} innerClassName="rounded-3xl" className="h-full">
      <article
        className={cn(
          "card card-hover group preserve-3d flex h-full flex-col p-3",
          c.wide && "sm:grid sm:grid-cols-2 sm:gap-3 xl:flex xl:flex-col"
        )}
      >
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${c.cta}: ${c.name} (opens in a new tab)`}
          className="preserve-3d relative block aspect-[4/3] rounded-2xl outline-offset-4"
          style={{ transform: "translateZ(12px)" }}
        >
          <c.Visual />

          <span className="chip absolute left-[5%] top-[6%]" style={{ transform: "translateZ(60px)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
            {c.chip}
          </span>

          <span
            aria-hidden
            className="absolute right-[5%] top-[6%] flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-burgundy text-cream opacity-0 shadow-[0_18px_30px_-14px_rgba(90,31,43,0.8)] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
            style={{ transform: "translateZ(70px)" }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>

        <div
          className={cn(
            "flex flex-1 flex-col px-3 pb-3 pt-7",
            c.wide && "sm:justify-center sm:py-4 sm:pl-4 sm:pr-5 xl:justify-start xl:px-3 xl:pb-3 xl:pt-7"
          )}
          style={{ transform: "translateZ(26px)" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-[14px] font-medium tracking-[0.2em] text-pink-deep">{c.n}</span>
            <span className="h-px flex-1 bg-burgundy/10" />
          </div>
          <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.26em] text-brown-muted">{c.category}</p>
          <h3 className="mt-2.5 font-display text-[1.6rem] font-medium leading-[1.12] text-burgundy">{c.name}</h3>
          <p className="mt-1.5 truncate text-[13px] text-brown-muted">{c.meta}</p>
          <div className="mt-auto pt-7">
            <Button
              href={c.href}
              external
              variant="ghost"
              size="sm"
              className="w-full justify-between border-burgundy/20 hover:bg-burgundy-deep hover:text-cream group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-cream"
            >
              {c.cta}
            </Button>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Clients() {
  return (
    <section id="work" className="relative bg-sand-light py-28 lg:py-40" aria-labelledby="clients-heading">
      <div className="container-x">
        <SectionHeading
          id="clients-heading"
          eyebrow="Client work"
          title={
            <>
              Clients <span className="display-italic">&amp;</span> Projects
            </>
          }
          subtitle="Real businesses. Real digital experiences."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:mt-20">
          {clients.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1} className={cn("h-full", c.wide && "sm:col-span-2 xl:col-span-1")}>
              <ClientCard c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-5 border-t border-burgundy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-brown-muted">Your business could be the next project — a website, a Google presence, or both.</p>
          <Button href="#contact" variant="ghost">
            Get a Free Consultation
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
