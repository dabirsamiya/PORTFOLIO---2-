import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { DEMO_REPUTATION as demo, DEMO_REVIEWS } from "@/lib/localServices";
import { cn } from "@/utils/cn";
import { Calendar, Check, ChevronDown, MapPin, Message } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";
import { CountUp, DashboardFrame, DemoMetric, StarRating } from "./DashboardPrimitives";

type ReviewExample = (typeof DEMO_REVIEWS)[number];

function RatingBreakdown() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="rounded-xl bg-sand-light p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy">Rating breakdown</p>
      <ul className="mt-5 space-y-4" aria-label="Demo review distribution">
        {demo.distribution.map(({ stars, count }, index) => (
          <li key={stars} className="flex items-center gap-3 text-xs text-brown-muted">
            <span className="w-10 shrink-0">{stars} Star</span>
            <span aria-hidden="true" className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-cream-2">
              <motion.span
                className="absolute inset-y-0 left-0 origin-left rounded-full bg-burgundy"
                style={{ width: `${(count / demo.totalReviews) * 100}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : index * 0.06 }}
              />
            </span>
            <span className="w-7 text-right font-semibold tabular-nums text-burgundy"><CountUp value={count} /></span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-burgundy/10 pt-4 text-[11px] leading-relaxed text-brown-muted">
        An illustrative reporting view. Review counts and ratings are demo values, not a live report.
      </p>
    </div>
  );
}

function ReviewExampleCard({ review }: { review: ReviewExample }) {
  const [showResponse, setShowResponse] = useState(true);
  const reduced = usePrefersReducedMotion();
  const responseId = useId();

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.15 } }}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-burgundy/10 bg-cream-2 p-4 transition-shadow hover:shadow-[0_12px_24px_-20px_rgba(90,31,43,0.5)] sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StarRating rating={review.stars} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brown-muted">Demo review</span>
      </div>
      <p className="mt-3 font-display text-lg leading-snug text-burgundy">&ldquo;{review.text}&rdquo;</p>
      <button
        type="button"
        aria-expanded={showResponse}
        aria-controls={responseId}
        onClick={() => setShowResponse((value) => !value)}
        className="mt-2 flex min-h-11 w-full items-center justify-between gap-3 text-left text-[11px] font-semibold text-burgundy"
      >
        <span className="inline-flex items-center gap-2"><Message className="h-3.5 w-3.5" />{showResponse ? "Example professional response" : "Show example response"}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", showResponse && "rotate-180")} />
      </button>
      <div id={responseId} hidden={!showResponse}>
        <p className="border-l-2 border-pink pl-3 text-[13px] leading-relaxed text-brown-muted">{review.response}</p>
      </div>
    </motion.article>
  );
}

function ReviewExamples() {
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");
  const visibleReviews = DEMO_REVIEWS.filter((review) => filter === "all" || filter === review.tone);
  const panelId = useId();
  const filters = [
    { id: "all", label: "All examples" },
    { id: "positive", label: "Positive" },
    { id: "negative", label: "Negative" },
  ] as const;

  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center gap-1 border-b border-burgundy/10" role="group" aria-label="Filter demonstration reviews">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            aria-controls={panelId}
            onClick={() => setFilter(id)}
            className={cn(
              "min-h-11 border-b-2 px-3 py-2 text-[11px] font-semibold transition-colors sm:text-xs",
              filter === id ? "border-burgundy text-burgundy" : "border-transparent text-brown-muted hover:border-pink hover:text-burgundy"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">Showing {visibleReviews.length} fictional review {visibleReviews.length === 1 ? "example" : "examples"}.</p>
      <div id={panelId} className="space-y-3" aria-label="Fictional reviews and example responses">
        <AnimatePresence initial={false}>
          {visibleReviews.map((review) => <ReviewExampleCard key={review.id} review={review} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ReviewManagementDashboard() {
  return (
    <TiltCard max={2.5} scale={1} glare={false} innerClassName="rounded-2xl">
      <DashboardFrame title="Review Management Dashboard">
        <div className="p-5 sm:p-7">
          <div className="grid gap-6 border-b border-burgundy/10 pb-6 md:grid-cols-[minmax(0,1fr)_1.5fr]">
            <Reveal amount={0.1}>
              <p className="text-xs font-semibold text-burgundy">Google Reviews</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="font-display text-6xl leading-none text-burgundy"><CountUp value={demo.rating} decimals={1} /></span>
                <div><StarRating rating={demo.rating} /><p className="mt-1 text-[11px] text-brown-muted">Demo reputation overview</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex items-center" amount={0.1}>
              <dl className="grid w-full grid-cols-3 gap-3 sm:gap-5">
                <DemoMetric label="Total Reviews" value={demo.totalReviews} delay={0.1} />
                <DemoMetric label="New Reviews" value={demo.newReviews} prefix="+" delay={0.2} />
                <DemoMetric label="Response Rate" value={demo.responseRate} suffix="%" delay={0.3} />
              </dl>
            </Reveal>
          </div>
          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.5fr)]">
            <Reveal delay={0.1} amount={0.1}><RatingBreakdown /></Reveal>
            <Reveal delay={0.2} amount={0.1}><ReviewExamples /></Reveal>
          </div>
        </div>
      </DashboardFrame>
    </TiltCard>
  );
}

function ProfileHealth() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="flex items-center gap-4 rounded-xl bg-sand-light p-4 sm:p-5">
      <div className="relative h-24 w-24 shrink-0">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-cream-2)" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke="var(--color-burgundy)" strokeWidth="5" strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: demo.profileHealth / 100 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-burgundy"><CountUp value={demo.profileHealth} suffix="%" /></span>
      </div>
      <div>
        <p className="text-sm font-semibold text-burgundy">Profile Health</p>
        <p className="mt-1 max-w-[180px] text-[11px] leading-relaxed text-brown-muted">Illustrative completeness score. Not an official Google metric.</p>
      </div>
    </div>
  );
}

export function ProfileManagementDashboard() {
  return (
    <TiltCard max={2.5} scale={1} glare={false} innerClassName="rounded-2xl">
      <DashboardFrame title="Google Business Profile Management">
        <div className="p-5 sm:p-7">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Reveal amount={0.1}>
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-light text-burgundy"><MapPin className="h-6 w-6" /></span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brown-muted">Business Profile</p>
                  <p className="mt-2 font-display text-[24px] leading-tight text-burgundy sm:text-[30px]">{demo.business}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-brown-muted">
                    <StarRating rating={demo.rating} /><span className="font-semibold text-burgundy">4.8</span><span>248 reviews</span>
                  </div>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brown-muted">Fictional business / Demo data</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} amount={0.1}><ProfileHealth /></Reveal>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Reveal delay={0.12} amount={0.1}>
              <div className="h-full rounded-xl border border-burgundy/10 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy">Information</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-xs text-brown-muted lg:grid-cols-1">
                  {["Business information", "Hours", "Categories", "Services", "Website", "Photos"].map((item) => (
                    <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 shrink-0 text-burgundy" />{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-2" amount={0.1}>
              <div className="h-full rounded-xl border border-burgundy/10 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy">Content</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Calendar className="mb-3 h-5 w-5 text-pink-deep" />
                    <p className="text-[13px] font-medium text-burgundy">Google Posts</p>
                    <p className="mt-2 text-xs text-brown-muted"><span className="mr-1 font-display text-[38px] leading-none text-burgundy"><CountUp value={demo.posts} /></span> published</p>
                    <p className="mt-3 text-[11px] leading-relaxed text-brown-muted">Offers, updates, and useful business information.</p>
                  </div>
                  <div className="border-t border-burgundy/10 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <Message className="mb-3 h-5 w-5 text-pink-deep" />
                    <p className="text-[13px] font-medium text-burgundy">Reviews</p>
                    <p className="mt-2 text-xs text-brown-muted"><span className="mr-1 font-display text-[38px] leading-none text-burgundy"><CountUp value={demo.newReviews} delay={0.1} /></span> new reviews</p>
                    <p className="mt-3 text-xs text-brown-muted"><strong className="font-semibold text-burgundy"><CountUp value={demo.responseRate} suffix="%" delay={0.2} /></strong> response rate</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} amount={0.1}>
            <div className="mt-6 border-t border-burgundy/10 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy">Customer Actions</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 sm:gap-6">
                <DemoMetric label="Website clicks" value={demo.websiteClicks} />
                <DemoMetric label="Direction requests" value={demo.directions} delay={0.1} />
                <DemoMetric label="Calls" value={demo.calls} delay={0.2} />
              </dl>
              <details className="group mt-5 border-t border-burgundy/10 pt-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-burgundy [&::-webkit-details-marker]:hidden">
                  How to read this concept dashboard
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-3 text-xs leading-relaxed text-brown-muted">These numbers illustrate a reporting layout only. Real reports use available Google Business Profile data. Website clicks, direction requests, and call interactions do not necessarily represent completed bookings or sales.</p>
              </details>
            </div>
          </Reveal>
        </div>
      </DashboardFrame>
    </TiltCard>
  );
}