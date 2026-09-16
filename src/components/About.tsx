import { site, whatsappLink } from "@/lib/site";
import { Button } from "./ui/Button";
import { Instagram, Phone, WhatsApp } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

const principles = [
  { k: "Direct", v: "You work with me, not a ticket queue." },
  { k: "Practical", v: "Only what moves your business forward." },
  { k: "Connected", v: "Website, Google and follow-ups — one system." },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[70vmax] w-[70vmax] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(231,209,206,0.45),transparent_70%)]" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Digital Presence Should <span className="display-italic">Drive</span> Business.
              </>
            }
          />
          <div className="mt-8 max-w-2xl space-y-5 text-[17px] leading-relaxed text-brown">
            <Reveal delay={0.1}>
              <p>
                Samya Digital Agency started with a simple observation: most local businesses don't have a marketing problem —
                they have a connection problem. People are searching on Google, checking websites and messaging on WhatsApp
                before they decide where to go. For most businesses, those pieces don't work together.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I'm Samya. I work directly with business owners — salons, spas, clinics, cafes, restaurants, gyms, hotels,
                resorts, travel companies and real estate — to build the website, the Google presence and the follow-up system
                that turn attention into bookings, and first-time visitors into regulars.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p>
                No layers of account managers. No jargon. Just practical digital work, explained clearly and built around how
                your customers actually behave.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact">Work with Samya</Button>
            <Button href={site.instagram} external variant="ghost" arrow={false}>
              <Instagram className="mr-1 h-4 w-4" /> {site.handle}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <Reveal delay={0.2} className="h-full">
            <TiltCard max={7} innerClassName="rounded-3xl" className="h-full">
              <div className="card-sand preserve-3d relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden p-8 lg:p-10">
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(207,166,163,0.5),transparent_65%)]" />
                <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
                  <span className="display-italic flex h-20 w-20 items-center justify-center rounded-2xl bg-burgundy text-5xl text-cream shadow-[0_24px_40px_-20px_rgba(90,31,43,0.8)]">
                    S
                  </span>
                  <span className="chip">Founder</span>
                </div>
                <div className="relative mt-10" style={{ transform: "translateZ(22px)" }}>
                  <p className="font-display text-3xl font-medium text-burgundy">Samya</p>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-brown-muted">Samya Digital Agency · {site.handle}</p>
                  <p className="display-italic mt-5 text-[1.6rem] leading-snug text-burgundy-light">
                    "If your online presence isn't bringing customers in, it isn't finished."
                  </p>
                </div>
                <ul className="relative mt-10 space-y-3 border-t border-burgundy/10 pt-6" style={{ transform: "translateZ(16px)" }}>
                  {principles.map((p) => (
                    <li key={p.k} className="flex items-baseline gap-4 text-[14.5px]">
                      <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-pink-deep">{p.k}</span>
                      <span className="text-brown">{p.v}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 flex flex-wrap gap-2" style={{ transform: "translateZ(16px)" }}>
                  <a href={site.phoneTel} className="inline-flex h-10 items-center gap-2 rounded-full border border-burgundy/20 px-4 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:bg-burgundy hover:text-cream">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-burgundy/20 px-4 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:bg-burgundy hover:text-cream">
                    <WhatsApp className="h-3.5 w-3.5 text-wa" /> WhatsApp
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
