import { motion } from "framer-motion";
import { lazy, Suspense, type ComponentType } from "react";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useLocalServiceDetails } from "@/hooks/useLocalServiceDetails";
import { useLead, type Need } from "@/lib/lead";
import { LOCAL_SERVICE_IDS, localServices, type LocalServiceId } from "@/lib/localServices";
import { Button } from "./ui/Button";
import { Calendar, Check, Globe, MapPin, Message, Phone, StarSolid, WhatsApp } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { ProfileServicePreview, ReviewServicePreview } from "./services/ServicePreviews";

const LocalServiceDetails = lazy(() => import("./services/LocalServiceDetails"));

const floatAnim = (delay = 0, amp = 8) => ({
  animate: { y: [0, -amp, 0] },
  transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const glass = "rounded-2xl border border-burgundy/10 bg-cream-2/95 shadow-[0_24px_50px_-24px_rgba(90,31,43,0.5)] backdrop-blur-sm";

/* ---------------- 01 · Layered browser windows ---------------- */
function BrowserVisual() {
  return (
    <div className="preserve-3d relative h-full w-full">
      {/* Back layers */}
      <div style={{ transform: "translateZ(-40px)" }} className="absolute left-[16%] top-[9%] h-[62%] w-[70%] rounded-2xl bg-pink-light/80 shadow-[0_30px_60px_-30px_rgba(90,31,43,0.35)]" />
      <div style={{ transform: "translateZ(-20px)" }} className="absolute left-[10%] top-[14%] h-[62%] w-[74%] rounded-2xl bg-sand shadow-[0_30px_60px_-30px_rgba(90,31,43,0.35)]" />

      <div className="absolute left-1/2 top-[52%] w-[92%] max-w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-burgundy/10 bg-cream-2 shadow-[0_60px_100px_-40px_rgba(90,31,43,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-burgundy/8 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-pink" />
          <span className="h-2 w-2 rounded-full bg-sand" />
          <span className="h-2 w-2 rounded-full bg-burgundy" />
          <span className="mx-auto flex h-6 w-1/2 items-center justify-center gap-1.5 rounded-md bg-cream-3 text-[10px] text-brown-muted">
            <Globe className="h-3 w-3" /> yourbusiness.com
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-burgundy" />
              <span className="h-2 w-14 rounded bg-sand-deep/70" />
            </span>
            <span className="flex items-center gap-3">
              <span className="h-1.5 w-8 rounded bg-sand" />
              <span className="h-1.5 w-8 rounded bg-sand" />
              <span className="h-5 w-14 rounded-full bg-burgundy" />
            </span>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <p className="font-display text-[19px] leading-tight text-burgundy">
                A first impression <span className="display-italic">worth booking.</span>
              </p>
              <div className="mt-3 h-1.5 w-10/12 rounded bg-sand" />
              <div className="mt-1.5 h-1.5 w-8/12 rounded bg-sand" />
              <div className="mt-4 flex gap-2">
                <span className="flex h-7 items-center rounded-full bg-burgundy px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream">Book now</span>
                <span className="flex h-7 items-center rounded-full border border-burgundy/30 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-burgundy">Call</span>
              </div>
            </div>
            <div className="col-span-2 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(207,166,163,0.9),transparent_55%),linear-gradient(160deg,#dccbb8,#e7d1ce)]" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-sand-light p-2.5">
                <span className="block h-5 w-5 rounded-full bg-pink" />
                <span className="mt-2 block h-1.5 w-3/4 rounded bg-sand-deep/50" />
                <span className="mt-1 block h-1.5 w-1/2 rounded bg-sand" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div {...floatAnim(0.3)} style={{ z: 90 }} className={cn(glass, "absolute right-[2%] top-[6%] flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[12px] font-medium text-burgundy")}>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-wa/15 text-wa">
          <WhatsApp className="h-4 w-4" />
        </span>
        Chat on WhatsApp
      </motion.div>

      <motion.div {...floatAnim(1.4, 6)} style={{ z: 70 }} className={cn(glass, "absolute bottom-[6%] left-[2%] flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-burgundy")}>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-light text-burgundy">
          <Calendar className="h-4 w-4" />
        </span>
        <span>
          <span className="block font-semibold">Appointment booked</span>
          <span className="block text-[10px] text-brown-muted">From the website · just now</span>
        </span>
      </motion.div>

      <motion.div {...floatAnim(2.2, 5)} style={{ z: 50 }} className="absolute bottom-[10%] right-[5%] hidden h-32 w-[4.1rem] rounded-[14px] border border-burgundy/15 bg-cream-2 p-1.5 shadow-[0_30px_60px_-20px_rgba(90,31,43,0.5)] sm:block">
        <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-sand" />
        <div className="h-2 w-8 rounded bg-burgundy/70" />
        <div className="mt-1 h-1 w-10 rounded bg-sand" />
        <div className="mt-2 h-8 rounded-md bg-[linear-gradient(160deg,#dccbb8,#e7d1ce)]" />
        <div className="mt-2 h-4 rounded-full bg-burgundy" />
      </motion.div>
    </div>
  );
}

/* ---------------- 02 · Google profile ---------------- */
function GoogleVisual() {
  return (
    <div className="preserve-3d relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 w-[86%] max-w-[370px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-burgundy/10 bg-cream-2 shadow-[0_60px_100px_-40px_rgba(90,31,43,0.55)]">
        <div className="relative h-36 overflow-hidden bg-sand-light">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: "linear-gradient(rgba(90,31,43,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(90,31,43,0.07) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <span className="absolute -left-4 top-[34%] h-1.5 w-[120%] rotate-[-9deg] bg-cream-2" />
          <span className="absolute left-[38%] -top-4 h-[130%] w-1.5 rotate-[14deg] bg-cream-2" />
          <span className="absolute -left-4 top-[70%] h-1 w-[120%] rotate-[4deg] bg-cream-2/80" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%]">
            <span className="absolute left-1/2 top-[70%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy/50 animate-pulse-ring" />
            <MapPin className="relative h-10 w-10 text-burgundy drop-shadow-[0_10px_14px_rgba(90,31,43,0.35)]" strokeWidth={1.8} />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[18px] font-medium text-burgundy">Your Business</p>
              <p className="mt-0.5 text-[11px] text-brown-muted">Local service · Open now</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-pink-light px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-burgundy">
              <Check className="h-3 w-3" strokeWidth={2.4} /> Complete
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((s) => (
              <StarSolid key={s} className="h-3.5 w-3.5 text-pink-deep" />
            ))}
            <span className="ml-1.5 text-[11px] text-brown-muted">Reviews</span>
          </div>
          <div className="mt-3.5 grid grid-cols-4 gap-1.5">
            {[
              { l: "Call", I: Phone },
              { l: "Route", I: MapPin },
              { l: "Site", I: Globe },
              { l: "Chat", I: Message },
            ].map(({ l, I }) => (
              <span key={l} className="flex flex-col items-center gap-1 rounded-lg border border-burgundy/8 bg-cream py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-brown">
                <I className="h-3.5 w-3.5 text-burgundy" />
                {l}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <span className="h-11 rounded-md bg-[linear-gradient(160deg,#dccbb8,#ede3d6)]" />
            <span className="h-11 rounded-md bg-[linear-gradient(200deg,#cfa6a3,#e7d1ce)]" />
            <span className="h-11 rounded-md bg-[linear-gradient(140deg,#c6b097,#dccbb8)]" />
          </div>
        </div>
      </div>

      <motion.div {...floatAnim(0.6)} style={{ z: 80 }} className={cn(glass, "absolute right-[2%] top-[8%] px-3.5 py-2.5 text-[12px] text-burgundy")}>
        <span className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((s) => (
            <StarSolid key={s} className="h-3 w-3 text-pink-deep" />
          ))}
        </span>
        <span className="mt-1 block font-semibold">New review received</span>
        <span className="block text-[10px] text-brown-muted">Google Business Profile</span>
      </motion.div>

      <motion.div {...floatAnim(1.8, 6)} style={{ z: 60 }} className={cn(glass, "absolute bottom-[8%] left-[2%] flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[12px] font-medium text-burgundy")}>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-light text-burgundy">
          <MapPin className="h-4 w-4" />
        </span>
        Found on Google Maps
      </motion.div>
    </div>
  );
}

/* ---------------- 03 · Customer journey ---------------- */
const journeyStages = ["Inactive Customer", "Follow-up", "Reactivated", "Repeat Customer"];
const people = ["S", "A", "R"];
const DUR = 11;
const times = [0, 0.06, 0.28, 0.34, 0.56, 0.62, 0.84, 0.9, 1];

function JourneyAvatar({ letter, delay, reduced, staticPos }: { letter: string; delay: number; reduced: boolean; staticPos: number }) {
  const bg = ["#ede3d6", "#e7d1ce", "#cfa6a3", "#5a1f2b"];
  const fg = ["#7a6761", "#5a1f2b", "#3e1520", "#f7f1e8"];
  const border = ["rgba(90,31,43,0.15)", "rgba(90,31,43,0.3)", "rgba(90,31,43,0.4)", "#5a1f2b"];
  if (reduced) {
    return (
      <div
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[13px] font-semibold"
        style={{ left: `${(staticPos * 100) / 3}%`, backgroundColor: bg[staticPos], color: fg[staticPos], borderColor: border[staticPos] }}
      >
        {staticPos === 3 ? <Check className="h-4 w-4" strokeWidth={2.6} /> : letter}
      </div>
    );
  }
  const seq = (arr: string[]) => [arr[0], arr[0], arr[1], arr[1], arr[2], arr[2], arr[3], arr[3], arr[3]];
  const tr = { duration: DUR, times, repeat: Infinity, ease: "easeInOut" as const, delay };
  return (
    <motion.div
      className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[13px] font-semibold shadow-[0_16px_30px_-16px_rgba(90,31,43,0.6)]"
      animate={{
        left: ["0%", "0%", "33.333%", "33.333%", "66.666%", "66.666%", "100%", "100%", "100%"],
        opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
        backgroundColor: seq(bg),
        borderColor: seq(border),
        color: seq(fg),
      }}
      transition={tr}
    >
      <span className="relative">
        <motion.span className="block" animate={{ opacity: [1, 1, 1, 1, 1, 1, 0, 0, 0] }} transition={tr}>
          {letter}
        </motion.span>
        <motion.span className="absolute inset-0 flex items-center justify-center" animate={{ opacity: [0, 0, 0, 0, 0, 0, 1, 1, 1] }} transition={tr}>
          <Check className="h-4 w-4" strokeWidth={2.6} />
        </motion.span>
      </span>
    </motion.div>
  );
}

function ReactivationVisual() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="preserve-3d relative h-full w-full">
      <div className="absolute inset-x-[6%] top-1/2 -translate-y-1/2">
        <div className="relative mx-6 h-px bg-burgundy/15">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-sand via-pink to-burgundy" />
          {[0, 33.333, 66.666, 100].map((p) => (
            <span key={p} className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy/50 bg-cream" style={{ left: `${p}%` }} />
          ))}
          {people.map((l, i) => (
            <JourneyAvatar key={l} letter={l} delay={i * (DUR / 3)} reduced={reduced} staticPos={i + 1} />
          ))}
        </div>
        <div className="mt-12 grid grid-cols-4 text-center text-[9.5px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]">
          {journeyStages.map((s, i) => (
            <span key={s} className={cn(i === 0 ? "text-brown-muted/70" : i === 3 ? "text-burgundy" : "text-brown")}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <motion.div {...floatAnim(0.4, 6)} style={{ z: 80 }} className={cn(glass, "absolute left-[2%] top-[5%] max-w-[250px] rounded-bl-md px-3.5 py-3 text-[12px]")}>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-wa">
          <WhatsApp className="h-3.5 w-3.5" /> WhatsApp follow-up
        </span>
        <p className="mt-1.5 leading-snug text-brown">Hi Sara, it's been a while! We'd love to see you again — book your next visit here →</p>
      </motion.div>

      <motion.div {...floatAnim(1.6, 6)} style={{ z: 60 }} className={cn(glass, "absolute bottom-[6%] right-[2%] flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-burgundy")}>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-light text-burgundy">
          <Calendar className="h-4 w-4" />
        </span>
        <span>
          <span className="block font-semibold">Appointment rebooked</span>
          <span className="block text-[10px] text-brown-muted">Reminder sent automatically</span>
        </span>
      </motion.div>
    </div>
  );
}

/* ---------------- Data ---------------- */
type Service = {
  n: string;
  kicker: string;
  title: string;
  lead?: string;
  desc: string;
  items: string[];
  cta: string;
  need: Need;
  Visual: ComponentType;
  detailId?: LocalServiceId;
};

const services: Service[] = [
  {
    n: "01",
    kicker: "Website",
    title: "Website Development",
    desc: "Turn your website into a professional digital storefront that builds trust and guides visitors toward becoming customers.",
    items: ["Business Websites", "Website Redesign", "Landing Pages", "Mobile Optimization", "WhatsApp Integration", "Conversion-focused Design"],
    cta: "Build My Website",
    need: "Website Development",
    Visual: BrowserVisual,
  },
  {
    n: "02",
    kicker: "Google",
    title: "Google Business Profile",
    desc: "Make it easier for local customers to discover, trust and contact your business when they search.",
    items: ["GMB Building", "Profile Optimization", "Business Information", "Photos & Updates", "Review Support", "Local Presence"],
    cta: "Improve My Google Presence",
    need: "Google Business Profile",
    Visual: GoogleVisual,
  },
  {
    n: "03",
    kicker: "Retention",
    title: "Customer Reactivation & Retention",
    lead: "Your old customers can become your next customers.",
    desc: "We help businesses identify inactive customers and create structured follow-up processes that encourage repeat visits, bookings and purchases.",
    items: ["Inactive Customer Identification", "WhatsApp Follow-ups", "Appointment Reminders", "Rebooking Campaigns", "Repeat-Visit Workflows", "Customer Retention"],
    cta: "Reactivate My Customers",
    need: "Customer Reactivation & Retention",
    Visual: ReactivationVisual,
  },
  {
    n: "04",
    kicker: "Reputation",
    title: localServices["google-review-management"].name,
    lead: localServices["google-review-management"].positioning,
    desc: localServices["google-review-management"].shortDescription,
    items: localServices["google-review-management"].highlights,
    cta: "Explore Service",
    need: "Google Review Management",
    Visual: ReviewServicePreview,
    detailId: "google-review-management",
  },
  {
    n: "05",
    kicker: "Local presence",
    title: localServices["google-business-profile-management"].name,
    lead: localServices["google-business-profile-management"].positioning,
    desc: localServices["google-business-profile-management"].shortDescription,
    items: localServices["google-business-profile-management"].highlights,
    cta: "Explore Service",
    need: "Google Business Profile Management",
    Visual: ProfileServicePreview,
    detailId: "google-business-profile-management",
  },
];

function ServiceCard({ s, index, onExplore }: { s: Service; index: number; onExplore: (id: LocalServiceId) => void }) {
  const { startWith } = useLead();
  const flip = index % 2 === 1;
  return (
    <Reveal amount={0.15}>
      <article id={s.detailId ? `${s.detailId}-card` : undefined} className="card card-hover grid overflow-hidden lg:grid-cols-2">
        <div className={cn("flex flex-col justify-center p-7 sm:p-10 lg:p-12", flip && "lg:order-last")}>
          <div className="flex items-center gap-3">
            <span className="font-display text-[14px] font-medium tracking-[0.2em] text-pink-deep">{s.n}</span>
            <span className="h-px w-10 bg-burgundy/12" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brown-muted">{s.kicker}</span>
          </div>
          <h3 className="display mt-6 font-display text-[2.1rem] font-normal leading-[1.02] tracking-[-0.015em] text-burgundy sm:text-[2.6rem]">{s.title}</h3>
          {s.lead && <p className="display-italic mt-4 text-[1.35rem] leading-snug text-burgundy-light">{s.lead}</p>}
          <p className="mt-4 text-[16.5px] leading-relaxed text-brown-muted">{s.desc}</p>
          <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {s.items.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-[14.5px] text-brown">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pink-deep" />
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Button
              href={s.detailId ? `#${s.detailId}` : undefined}
              ariaLabel={s.detailId ? `Explore ${s.title}` : undefined}
              onClick={() => s.detailId ? onExplore(s.detailId) : startWith(s.need)}
            >
              {s.cta}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "relative min-h-[380px] overflow-hidden border-burgundy/8 bg-sand-light sm:min-h-[440px] lg:min-h-0",
            flip ? "border-b lg:border-b-0 lg:border-r" : "border-t lg:border-l lg:border-t-0",
            flip && "order-first lg:order-none",
            s.detailId && "min-h-[460px] sm:min-h-[480px] lg:min-h-[480px]"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,209,206,0.7),transparent_65%)]" />
          <TiltCard className="absolute inset-6 sm:inset-8" max={10} scale={1} glare={false}>
            <s.Visual />
          </TiltCard>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  const { activeService, exploreService, closeService } = useLocalServiceDetails();
  return (
    <section id="services" className="relative bg-cream py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What We <span className="display-italic">Build</span> For You.
            </>
          }
          subtitle="Focused digital solutions without unnecessary complexity."
        />
        <div className="mt-16 space-y-6 lg:mt-20 lg:space-y-8">
          {services.map((s, i) => (
            <ServiceCard key={s.n} s={s} index={i} onExplore={exploreService} />
          ))}
        </div>
        {LOCAL_SERVICE_IDS.map((id) => (
          <div key={id} id={id} className={activeService === id ? "pt-14 lg:pt-20" : undefined}>
            {activeService === id && (
              <Suspense fallback={<p role="status" className="py-12 text-center text-sm text-brown-muted">Opening service details...</p>}>
                <LocalServiceDetails serviceId={id} onExplore={exploreService} onClose={closeService} />
              </Suspense>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
