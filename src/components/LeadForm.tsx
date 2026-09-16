import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { NEEDS, useLead, type Need } from "@/lib/lead";
import { site, whatsappLink } from "@/lib/site";
import { Button } from "./ui/Button";
import { ArrowRight, Check, ChevronDown, Instagram, Phone, WhatsApp } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const businessTypes = ["Salon", "Spa", "Clinic", "Hotel", "Resort", "Cafe", "Restaurant", "Gym", "Fitness", "Travel & Tours", "Real Estate", "Other local service"];

type FormState = {
  name: string;
  business: string;
  type: string;
  whatsapp: string;
  email: string;
  website: string;
  need: Need;
  message: string;
};

const initial: FormState = { name: "", business: "", type: "", whatsapp: "", email: "", website: "", need: "", message: "" };

const steps = [
  { t: "You tell us about your business", d: "Two minutes. No preparation needed." },
  { t: "We review your online presence", d: "Website, Google profile and how customers reach you." },
  { t: "You get a clear recommendation", d: "Where the biggest opportunity is — and what it would take." },
];

function Field({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="ml-1.5 normal-case tracking-normal text-brown-muted/70">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

export function LeadForm() {
  const { need, setNeed } = useLead();
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastLink, setLastLink] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    if (need) setForm((f) => ({ ...f, need }));
  }, [need]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "need") setNeed(value as Need);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hi Samya Digital Agency, I’d like a free consultation.",
      "",
      `Name: ${form.name}`,
      `Business: ${form.business}`,
      `Type: ${form.type || "—"}`,
      `WhatsApp: ${form.whatsapp}`,
      `Email: ${form.email || "—"}`,
      `Website: ${form.website || "—"}`,
      `Service required: ${form.need || "—"}`,
      "",
      form.message ? `Message: ${form.message}` : "",
    ]
      .join("\n")
      .trim();
    const link = whatsappLink(msg);
    setLastLink(link);
    setLastMessage(msg);
    window.open(link, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lastMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-pink py-28 lg:py-40" aria-labelledby="contact-heading">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(231,209,206,0.7),transparent_70%)]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(179,132,127,0.35),transparent_70%)]" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            eyebrow="Free consultation"
            title={
              <>
                Let's Find Your Biggest <span className="display-italic">Digital</span> Opportunity.
              </>
            }
            subtitle={<span className="text-burgundy-deep/75">Tell us about your business and what you want to improve.</span>}
          />

          <Reveal delay={0.2}>
            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy font-display text-[13px] font-medium text-cream">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-burgundy-deep">{s.t}</p>
                    <p className="mt-0.5 text-[14.5px] text-burgundy-deep/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-2xl border border-burgundy/15 bg-cream/40 p-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-burgundy">Prefer to talk directly?</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a href={site.phoneTel} className="inline-flex h-11 items-center gap-2 rounded-full border border-burgundy/20 bg-cream/60 px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:bg-burgundy hover:text-cream">
                  <Phone className="h-4 w-4" /> {site.phoneDisplay}
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-burgundy/20 bg-cream/60 px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:bg-burgundy hover:text-cream">
                  <WhatsApp className="h-4 w-4 text-wa" /> WhatsApp
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-burgundy/20 bg-cream/60 px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:bg-burgundy hover:text-cream">
                  <Instagram className="h-4 w-4" /> {site.handle}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15} amount={0.1}>
            <div className="card relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {!sent ? (
                  <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="relative">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name">
                        <input id="name" required autoComplete="name" className="field" placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                      </Field>
                      <Field id="business" label="Business name">
                        <input id="business" required autoComplete="organization" className="field" placeholder="Your business" value={form.business} onChange={(e) => update("business", e.target.value)} />
                      </Field>
                      <Field id="type" label="Business type">
                        <input id="type" list="business-types" className="field" placeholder="Salon, clinic, cafe…" value={form.type} onChange={(e) => update("type", e.target.value)} />
                        <datalist id="business-types">
                          {businessTypes.map((t) => (
                            <option key={t} value={t} />
                          ))}
                        </datalist>
                      </Field>
                      <Field id="whatsapp" label="WhatsApp number">
                        <input id="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="+91 00000 00000" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
                      </Field>
                      <Field id="email" label="Email">
                        <input id="email" type="email" autoComplete="email" className="field" placeholder="you@business.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                      </Field>
                      <Field id="website" label="Website" optional>
                        <input id="website" type="url" inputMode="url" className="field" placeholder="https://" value={form.website} onChange={(e) => update("website", e.target.value)} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field id="need" label="Service required">
                          <div className="relative">
                            <select
                              id="need"
                              required
                              className="field appearance-none pr-11"
                              value={form.need}
                              onChange={(e) => update("need", e.target.value as Need)}
                            >
                              <option value="" disabled>
                                Select a service
                              </option>
                              {NEEDS.map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-burgundy" />
                          </div>
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field id="message" label="Message">
                          <textarea id="message" rows={4} className="field resize-none" placeholder="Tell us a little about your business and what you'd like to improve." value={form.message} onChange={(e) => update("message", e.target.value)} />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Get My Free Consultation
                      </Button>
                      <p className="text-[13px] text-brown-muted">No pressure. Just a conversation about your business.</p>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-cream shadow-[0_24px_40px_-20px_rgba(90,31,43,0.8)]">
                      <Check className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <h3 className="display mt-6 font-display text-3xl font-normal text-burgundy">
                      Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Let's talk.
                    </h3>
                    <p className="mt-3 max-w-md text-brown-muted">
                      Your details are ready to send on WhatsApp. If a new window didn't open, use the button below — Samya replies personally.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button href={lastLink} external>
                        Open WhatsApp
                      </Button>
                      <button
                        type="button"
                        onClick={copy}
                        className="inline-flex h-12 items-center gap-2 rounded-full border border-burgundy/25 px-6 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-burgundy transition hover:border-burgundy/60"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4 rotate-90" />}
                        {copied ? "Copied" : "Copy my details"}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm(initial);
                      }}
                      className="mt-8 text-[13px] text-brown-muted underline-offset-4 hover:text-burgundy hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
