import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useServiceMetadata } from "@/hooks/useServiceMetadata";
import { useLead } from "@/lib/lead";
import { localServices, type LocalService, type LocalServiceId } from "@/lib/localServices";
import { scrollToId } from "@/lib/scroll";
import { whatsappLink } from "@/lib/site";
import { Button } from "../ui/Button";
import { Calendar, Check, ChevronDown, Globe, Images, Layers, MapPin, Message, Search, TrendUp, X } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ProfileManagementDashboard, ReviewManagementDashboard } from "./ServiceDashboards";
import { ServiceWorkflow } from "./ServiceWorkflow";

type Props = {
  serviceId: LocalServiceId;
  onExplore: (id: LocalServiceId) => void;
  onClose: () => void;
};

const managedAreas = [
  { label: "Profile Optimization", feature: "optimization", Icon: MapPin },
  { label: "Categories", feature: "categories", Icon: Layers },
  { label: "Services", feature: "services", Icon: Check },
  { label: "Photos", feature: "photos", Icon: Images },
  { label: "Google Posts", feature: "posts", Icon: Calendar },
  { label: "Reviews", feature: "reviews", Icon: Message },
  { label: "Local SEO", feature: "local-seo", Icon: Search },
  { label: "Performance Monitoring", feature: "reporting", Icon: TrendUp },
];

function WhatWeManage({ serviceId }: { serviceId: LocalServiceId }) {
  const showFeature = (feature: string) => {
    const id = `${serviceId}-${feature}`;
    const details = document.getElementById(id) as HTMLDetailsElement | null;
    if (!details) return;
    details.open = true;
    details.querySelector("summary")?.focus({ preventScroll: true });
    window.requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <section className="mt-14" aria-labelledby={`${serviceId}-areas-heading`}>
      <Reveal>
        <h3 id={`${serviceId}-areas-heading`} className="font-display text-[2rem] font-normal text-burgundy sm:text-[2.6rem]">What we <span className="display-italic">manage.</span></h3>
        <p className="mt-3 text-sm text-brown-muted">Select an area to see the work behind it.</p>
      </Reveal>
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
        {managedAreas.map(({ label, feature, Icon }, index) => (
          <Reveal key={label} delay={(index % 4) * 0.05} className="h-full" amount={0.1}>
            <button
              type="button"
              onClick={() => showFeature(feature)}
              className="group flex h-full min-h-[115px] w-full flex-col items-start gap-4 rounded-xl border border-burgundy/10 bg-cream-2 p-4 text-left transition-[translate,border-color,background-color] duration-500 hover:border-burgundy/30 hover:bg-pink-light/30 motion-safe:hover:-translate-y-1 sm:p-5"
            >
              <Icon className="h-5 w-5 text-pink-deep transition-colors group-hover:text-burgundy" />
              <span className="text-[13px] font-medium leading-snug text-burgundy">{label}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceScope({ service, onExplore }: { service: LocalService; onExplore: Props["onExplore"] }) {
  return (
    <section className="mt-16 border-t border-burgundy/10 pt-12 lg:mt-20" aria-labelledby={`${service.id}-scope-heading`}>
      <Reveal>
        <p className="eyebrow">The details</p>
        <h3 id={`${service.id}-scope-heading`} className="mt-4 font-display text-[2rem] font-normal text-burgundy sm:text-[2.6rem]">Considered care. <span className="display-italic">Every detail.</span></h3>
        <p className="mt-3 text-sm text-brown-muted">Explore what's included in {service.name.toLowerCase()}.</p>
      </Reveal>
      <div className="mt-8 grid items-start gap-x-9 md:grid-cols-2">
        {service.features.map((feature, index) => (
          <details
            key={feature.id}
            id={`${service.id}-${feature.id}`}
            open={index === 0}
            className="group/scope border-t border-burgundy/15 py-1"
          >
            <summary className="cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
              <h4 className="flex items-start gap-3 font-display text-[19px] font-medium leading-snug text-burgundy sm:text-xl">
                <span className="mt-1 shrink-0 font-sans text-[10px] tracking-[0.15em] text-brown-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1">{feature.title}</span>
                <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-pink-deep transition-transform duration-300 group-open/scope:rotate-180" />
              </h4>
            </summary>
            <div className="pb-5 pl-7">
              <p className="text-sm leading-relaxed text-brown-muted">{feature.description}</p>
              {feature.points && (
                <ul className="mt-3 space-y-2 text-sm text-brown-muted">
                  {feature.points.map((point) => <li key={point} className="flex items-center gap-2"><span className="h-1 w-1 shrink-0 rounded-full bg-pink-deep" />{point}</li>)}
                </ul>
              )}
              {feature.relatedService && (
                <Button
                  href={`#${feature.relatedService}`}
                  variant="link"
                  onClick={() => { if (feature.relatedService) onExplore(feature.relatedService); }}
                  className="mt-4 min-h-11 text-left text-[10px] tracking-[0.12em] sm:text-[11px]"
                >
                  Explore Review Management
                </Button>
              )}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-6 border-t border-burgundy/10 pt-5 text-xs leading-relaxed text-brown-muted">
        {service.id === "google-review-management" ? (
          <>
            Genuine feedback, never manufactured praise. No paid reviews, incentives, or review gating.
            Legitimate negative feedback is handled professionally, not suppressed. Reporting is reserved for suspected policy violations. {" "}
            <a href="https://support.google.com/business/answer/3474122?hl=en" target="_blank" rel="noopener noreferrer" className="text-burgundy underline decoration-pink underline-offset-4 hover:decoration-burgundy">Google's review guidelines</a>.
          </>
        ) : (
          "Thoughtful profile management, not ranking promises. Search visibility and available insights vary. We do not guarantee rankings, calls, leads, or revenue."
        )}
      </p>
    </section>
  );
}

const comparison = [
  ["Incomplete information", "Complete profile"],
  ["Weak service structure", "Organized services"],
  ["Few updates", "Regular updates"],
  ["Unanswered reviews", "Professional review responses"],
  ["Poor visual presentation", "Consistent visual content"],
];

function ProfileComparison() {
  return (
    <Reveal className="mt-16 lg:mt-20" amount={0.1}>
      <figure>
        <figcaption className="mb-5 font-display text-2xl font-normal text-burgundy">Example of a profile optimization workflow</figcaption>
        <div className="grid overflow-hidden rounded-2xl border border-burgundy/10 sm:grid-cols-2">
          <div className="bg-cream p-5 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brown-muted">Before</p>
            <ul className="mt-5 space-y-4">
              {comparison.map(([before]) => <li key={before} className="flex items-center gap-3 text-sm text-brown-muted"><X className="h-4 w-4 shrink-0 text-pink-deep" />{before}</li>)}
            </ul>
          </div>
          <div className="border-t border-burgundy/10 bg-sand-light p-5 sm:border-l sm:border-t-0 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy">After</p>
            <ul className="mt-5 space-y-4">
              {comparison.map(([, after]) => <li key={after} className="flex items-center gap-3 text-sm text-burgundy"><Check className="h-4 w-4 shrink-0" />{after}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs text-brown-muted">An illustration of the work involved, not guaranteed results or a client before-and-after.</p>
      </figure>
    </Reveal>
  );
}

function ServiceConsultation({ service }: { service: LocalService }) {
  const { startWith } = useLead();
  const isReviews = service.id === "google-review-management";
  return (
    <Reveal className="mt-16 lg:mt-20" amount={0.1}>
      <section className="rounded-2xl bg-burgundy px-6 py-10 text-cream sm:px-9 sm:py-12" aria-labelledby={`${service.id}-cta-heading`}>
        <h3 id={`${service.id}-cta-heading`} className="max-w-3xl font-display text-[2rem] font-normal leading-tight sm:text-[2.7rem]">
          {isReviews ? "Ready to strengthen your online reputation?" : "Your customers are already searching."}
        </h3>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/75">
          {isReviews ? "Let's build a more thoughtful approach to your customer feedback." : "Make sure your business is ready when they find you."}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button variant="light" onClick={() => startWith(service.need)} className="w-full sm:w-auto">Get Started</Button>
          <Button href={whatsappLink()} external variant="ghostLight" className="w-full sm:w-auto">WhatsApp Us</Button>
        </div>
      </section>
    </Reveal>
  );
}

function LocalPresence({ onExplore }: { onExplore: Props["onExplore"] }) {
  const { startWith } = useLead();
  const items = [
    { label: "Google Business Profile Management", Icon: MapPin },
    { label: "Review Management", Icon: Message },
    { label: "Website / Landing Page", Icon: Globe },
    { label: "Local SEO", Icon: Search },
  ];

  return (
    <section className="mt-12 border-t border-burgundy/10 pt-10" aria-labelledby="local-presence-heading">
      <Reveal>
        <h3 id="local-presence-heading" className="eyebrow">Complete your local presence</h3>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ label, Icon }, index) => (
            <div key={label} className="relative flex items-start gap-3 pr-5">
              <Icon className="mt-1 h-4 w-4 shrink-0 text-pink-deep" />
              <p className="font-display text-xl leading-snug text-burgundy">{label}</p>
              {index < items.length - 1 && <span aria-hidden="true" className="absolute -right-1 top-1 hidden text-burgundy/50 lg:block">+</span>}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <Button onClick={() => startWith("Multiple Services")}>Build My Local Presence</Button>
          <Button href="#google-review-management" variant="link" onClick={() => onExplore("google-review-management")} className="min-h-11 text-[11px] tracking-[0.12em]">Explore Review Management</Button>
        </div>
      </Reveal>
    </section>
  );
}

export default function LocalServiceDetails({ serviceId, onExplore, onClose }: Props) {
  const service = localServices[serviceId];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.01 });
  const reduced = usePrefersReducedMotion();
  const { startWith } = useLead();
  const isReviews = serviceId === "google-review-management";
  useServiceMetadata(service, inView);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      ref.current?.focus({ preventScroll: true });
      scrollToId(serviceId);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [serviceId]);

  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${serviceId}-heading`}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-burgundy/15 pt-8 outline-none focus:outline-none sm:pt-10"
      data-service-details={serviceId}
    >
      <div className="mb-9 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brown-muted">Service details / {isReviews ? "Reputation" : "Local presence"}</p>
        <Button variant="link" onClick={onClose} arrow={false} className="min-h-11 text-[11px] tracking-[0.12em]">Back to services</Button>
      </div>
      <SectionHeading
        id={`${serviceId}-heading`}
        title={service.name}
        subtitle={<span className="font-display text-xl italic text-burgundy-light sm:text-2xl">{service.positioning}</span>}
      />
      <Reveal delay={0.12}><p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-brown-muted sm:text-base">{service.description}</p></Reveal>
      <Reveal delay={0.18} className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => startWith(service.need)} className="w-full sm:w-auto">Get Started</Button>
        <Button href={whatsappLink()} external variant="ghost" className="w-full sm:w-auto">WhatsApp Us</Button>
      </Reveal>

      <section className="mt-12 sm:mt-16" aria-labelledby={`${serviceId}-dashboard-heading`}>
        <Reveal>
          <p className="eyebrow">The experience, illustrated</p>
          <h3 id={`${serviceId}-dashboard-heading`} className="mt-4 font-display text-[2rem] font-normal leading-tight text-burgundy sm:text-[2.6rem]">
            {isReviews ? <>A clearer view of your <span className="display-italic">reputation.</span></> : <>Every touchpoint, <span className="display-italic">considered.</span></>}
          </h3>
          <p className="mb-7 mt-3 text-sm text-brown-muted">A concept of how information can be organized. All displayed information is demo data.</p>
        </Reveal>
        {isReviews ? <ReviewManagementDashboard /> : <ProfileManagementDashboard />}
      </section>

      {!isReviews && <WhatWeManage serviceId={serviceId} />}
      <ServiceScope service={service} onExplore={onExplore} />
      <ServiceWorkflow steps={service.workflow} id={serviceId} />
      {!isReviews && <ProfileComparison />}
      <ServiceConsultation service={service} />
      {!isReviews && <LocalPresence onExplore={onExplore} />}
      <div className="mt-9 flex justify-end">
        <Button variant="link" onClick={onClose} arrow={false} className="min-h-11 text-[11px] tracking-[0.12em]">Back to all services</Button>
      </div>
    </motion.section>
  );
}