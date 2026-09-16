import { DEMO_REPUTATION as demo } from "@/lib/localServices";
import { Check, MapPin, Message } from "../ui/Icons";
import { CountUp, DashboardPreviewFrame, DemoMetric, StarRating } from "./DashboardPrimitives";

export function ReviewServicePreview() {
  return (
    <DashboardPreviewFrame>
      <div className="px-4 py-4 sm:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brown-muted">Google Reviews</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-display text-[42px] leading-none text-burgundy">
            <CountUp value={demo.rating} decimals={1} />
          </span>
          <div className="min-w-0">
            <StarRating rating={demo.rating} />
            <p className="mt-1 text-[10px] text-brown-muted">Every voice matters.</p>
          </div>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-3 border-y border-burgundy/10 py-3">
          <DemoMetric label="Total reviews" value={demo.totalReviews} compact />
          <DemoMetric label="New reviews" value={demo.newReviews} prefix="+" compact delay={0.1} />
          <DemoMetric label="Response rate" value={demo.responseRate} suffix="%" compact delay={0.2} />
        </dl>
        <div className="mt-3 border-l-2 border-pink pl-3">
          <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-brown-muted"><Message className="h-3 w-3" />Example feedback</p>
          <p className="mt-1 font-display text-[14px] leading-snug text-burgundy">
            &ldquo;Absolutely loved the service. The staff was amazing!&rdquo;
          </p>
        </div>
      </div>
    </DashboardPreviewFrame>
  );
}

export function ProfileServicePreview() {
  return (
    <DashboardPreviewFrame>
      <div className="px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-light text-burgundy">
            <MapPin className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brown-muted">Business profile / Fictional business</p>
            <p className="mt-1 font-display text-[18px] leading-tight text-burgundy">{demo.business}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRating rating={demo.rating} />
              <span className="text-[11px] text-brown-muted">4.8 / 248 reviews</span>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-sand-light p-3">
          <div className="flex items-baseline justify-between text-burgundy">
            <span className="text-xs font-medium">Profile health</span>
            <span className="font-display text-2xl"><CountUp value={demo.profileHealth} suffix="%" /></span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-cream-2">
            <div className="h-full w-[92%] rounded-full bg-burgundy" />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-brown-muted">
            {["Information", "Services", "Photos"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-burgundy" />{item}</span>
            ))}
          </div>
        </div>
        <p className="mb-3 mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-brown-muted">Customer actions / Demo</p>
        <dl className="grid grid-cols-3 gap-3">
          <DemoMetric label="Website clicks" value={demo.websiteClicks} compact />
          <DemoMetric label="Directions" value={demo.directions} compact delay={0.1} />
          <DemoMetric label="Calls" value={demo.calls} compact delay={0.2} />
        </dl>
      </div>
    </DashboardPreviewFrame>
  );
}