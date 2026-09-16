import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useLead } from "@/lib/lead";
import { lockScroll } from "@/lib/scroll";
import { Button } from "./ui/Button";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Images, X } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

/* ------------------------------------------------------------------ */
/* Data — exact Cloudinary assets, delivered with automatic format/quality */
/* ------------------------------------------------------------------ */

const CLOUD = "https://res.cloudinary.com/rimbtl5i/image/upload";
const cdn = (id: string, w: number) => `${CLOUD}/f_auto,q_auto,w_${w},c_limit/${id}`;

type Shot = { id: string; alt: string };
type Project = {
  key: string;
  filter: string;
  industry: string;
  title: string;
  portrait?: boolean;
  shots: Shot[];
};

const projects: Project[] = [
  {
    key: "fitness",
    filter: "FITNESS",
    industry: "Fitness",
    title: "Fitness Studio Website",
    shots: [
      { id: "v1789290501/Screenshot_2026-09-13_143718.png", alt: "Fitness studio website concept — homepage" },
      { id: "v1789290499/Screenshot_2026-09-13_143654.png", alt: "Fitness studio website concept — programs section" },
    ],
  },
  {
    key: "salon",
    filter: "SALON",
    industry: "Salon",
    title: "Salon Website",
    shots: [
      { id: "v1789290499/Screenshot_2026-09-13_143521.png", alt: "Salon website concept — homepage" },
      { id: "v1789290500/Screenshot_2026-09-13_143545.png", alt: "Salon website concept — services section" },
    ],
  },
  {
    key: "resort",
    filter: "RESORT",
    industry: "Resort",
    title: "Resort Website",
    shots: [
      { id: "v1789290499/Screenshot_2026-09-13_143127.png", alt: "Resort website concept — homepage" },
      { id: "v1789290499/Screenshot_2026-09-13_143316.png", alt: "Resort website concept — rooms section" },
      { id: "v1789290499/Screenshot_2026-09-13_143244.png", alt: "Resort website concept — experiences section" },
    ],
  },
  {
    key: "cafe",
    filter: "CAFE",
    industry: "Cafe",
    title: "Cafe Website",
    shots: [
      { id: "v1789290499/Screenshot_2026-09-13_143409.png", alt: "Cafe website concept — homepage" },
      { id: "v1789290500/Screenshot_2026-09-13_143431.png", alt: "Cafe website concept — menu section" },
    ],
  },
  {
    key: "restaurant",
    filter: "RESTAURANT",
    industry: "Restaurant",
    title: "Restaurant Website",
    shots: [
      { id: "v1789291038/Screenshot_2026-09-13_144017.png", alt: "Restaurant website concept — homepage" },
      { id: "v1789291038/Screenshot_2026-09-13_144031.png", alt: "Restaurant website concept — menu and reservations" },
    ],
  },
  {
    key: "spa",
    filter: "SPA",
    industry: "Spa",
    title: "Spa Website",
    shots: [
      { id: "v1789291041/Screenshot_2026-09-13_144358.png", alt: "Spa website concept — homepage" },
      { id: "v1789291039/Screenshot_2026-09-13_144451.png", alt: "Spa website concept — treatments section" },
    ],
  },
  {
    key: "travel",
    filter: "TRAVEL",
    industry: "Tours & Travel",
    title: "Tours & Travel Website",
    portrait: true,
    shots: [
      { id: "v1789291001/Screenshot_2026-09-13-14-45-47-57_99c04817c0de5652397fc8b56c3b3817.jpg", alt: "Tours and travel website concept — mobile homepage" },
      { id: "v1789291002/Screenshot_2026-09-13-14-45-37-46_99c04817c0de5652397fc8b56c3b3817.jpg", alt: "Tours and travel website concept — mobile packages view" },
    ],
  },
  {
    key: "gym",
    filter: "GYM",
    industry: "Gym",
    title: "Gym Website",
    portrait: true,
    shots: [
      { id: "v1789291002/Screenshot_2026-09-13-14-42-43-03_99c04817c0de5652397fc8b56c3b3817.jpg", alt: "Gym website concept — mobile homepage" },
      { id: "v1789291159/Screenshot_2026-09-13-14-43-15-02_99c04817c0de5652397fc8b56c3b3817.jpg", alt: "Gym website concept — mobile membership view" },
    ],
  },
  {
    key: "luxury-salon",
    filter: "LUXURY SALON",
    industry: "Luxury Salon",
    title: "Luxury Salon Website",
    shots: [
      { id: "v1789291039/Screenshot_2026-09-13_144128.png", alt: "Luxury salon website concept — homepage" },
      { id: "v1789291039/Screenshot_2026-09-13_144148.png", alt: "Luxury salon website concept — services section" },
      { id: "v1789291038/Screenshot_2026-09-13_144100.png", alt: "Luxury salon website concept — gallery section" },
    ],
  },
];

const filters = ["ALL", "FITNESS", "SALON", "RESORT", "CAFE", "RESTAURANT", "SPA", "TRAVEL", "GYM", "LUXURY SALON"];

/* ------------------------------------------------------------------ */
/* Frames                                                              */
/* ------------------------------------------------------------------ */

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-x-[7%] top-[9%] overflow-hidden rounded-t-xl border border-burgundy/10 border-b-0 bg-cream-2 shadow-[0_40px_70px_-30px_rgba(90,31,43,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-burgundy/8 bg-cream-2 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-pink" />
        <span className="h-1.5 w-1.5 rounded-full bg-sand" />
        <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
        <span className="mx-auto h-3 w-2/5 rounded-sm bg-cream-3" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute left-1/2 top-[8%] h-[112%] w-[46%] max-w-[190px] -translate-x-1/2 overflow-hidden rounded-[1.9rem] border-[5px] border-burgundy-deep bg-burgundy-deep shadow-[0_40px_70px_-30px_rgba(90,31,43,0.7)]">
      <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-burgundy-deep" />
      <div className="h-full w-full overflow-hidden rounded-[1.5rem] bg-cream-2">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const cover = p.shots[0];
  return (
    <TiltCard max={5} scale={1.01} innerClassName="rounded-3xl" className="h-full">
      <article
        className="card card-hover group preserve-3d flex h-full cursor-pointer flex-col p-3"
        onClick={onOpen}
        aria-label={`${p.title} — open gallery`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-light" style={{ transform: "translateZ(16px)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,209,206,0.7),transparent_60%)]" />
          {p.portrait ? <PhoneFrame src={cdn(cover.id, 700)} alt={cover.alt} /> : <BrowserFrame src={cdn(cover.id, 900)} alt={cover.alt} />}

          <span className="chip absolute left-3 top-3">Website Concept</span>
          <span className="chip absolute right-3 top-3">
            <Images className="h-3.5 w-3.5" /> {p.shots.length}
          </span>

          {/* Hover reveal */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-burgundy-deep/85 via-burgundy-deep/40 to-transparent px-4 pb-4 pt-14 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between text-cream">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">View Project</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-burgundy">
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between gap-4 px-3 pb-3 pt-5" style={{ transform: "translateZ(28px)" }}>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-pink-deep">{p.industry}</p>
            <h3 className="mt-1.5 font-display text-[1.45rem] font-medium leading-tight text-burgundy">{p.title}</h3>
            <p className="mt-1 text-[13px] text-brown-muted">Website Development</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            aria-label={`View ${p.title}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-burgundy/20 text-burgundy transition-all duration-500 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-cream"
          >
            <ArrowUpRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </article>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const { startWith } = useLead();
  const dialogRef = useRef<HTMLDivElement>(null);
  const total = project.shots.length;

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    lockScroll(true);
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [go, onClose]);

  // Preload neighbours
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const s = project.shots[(i + total) % total];
      const img = new Image();
      img.src = cdn(s.id, 1800);
    });
  }, [index, project, total]);

  const shot = project.shots[index];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(1);
    else if (info.offset.x > 70) go(-1);
  };

  return createPortal(
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex flex-col bg-burgundy-deep/95 text-cream outline-none backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-pink-light">
            Website Concept · {project.industry}
          </p>
          <h3 className="mt-1 truncate font-display text-xl font-medium sm:text-2xl">{project.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[12px] tracking-[0.2em] text-cream/60 sm:inline">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:bg-cream hover:text-burgundy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={shot.id}
            src={cdn(shot.id, 1800)}
            alt={shot.alt}
            decoding="async"
            initial={{ opacity: 0, x: dir * 40, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -40, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "max-h-full max-w-full select-none rounded-xl object-contain shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]",
              project.portrait ? "h-full w-auto" : "w-auto"
            )}
            draggable={false}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-burgundy-deep/60 text-cream backdrop-blur transition hover:bg-cream hover:text-burgundy sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-burgundy-deep/60 text-cream backdrop-blur transition hover:bg-cream hover:text-burgundy sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 px-5 pb-6 pt-4 sm:flex-row sm:justify-between sm:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          {project.shots.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "overflow-hidden rounded-md border-2 transition-all duration-300",
                project.portrait ? "h-16 w-9" : "h-11 w-[4.6rem]",
                i === index ? "border-cream opacity-100" : "border-transparent opacity-50 hover:opacity-90"
              )}
            >
              <img src={cdn(s.id, 240)} alt="" className="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <Button
          variant="light"
          onClick={() => {
            onClose();
            window.setTimeout(() => startWith("Website Development"), 80);
          }}
        >
          Get a website like this
        </Button>
      </div>
    </motion.div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Portfolio() {
  const [active, setActive] = useState("ALL");
  const [open, setOpen] = useState<Project | null>(null);
  const { startWith } = useLead();

  const visible = useMemo(() => (active === "ALL" ? projects : projects.filter((p) => p.filter === active)), [active]);

  return (
    <section id="concepts" className="relative bg-cream py-28 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Website concepts"
            title={
              <>
                Work That <span className="display-italic">Speaks</span> For Itself.
              </>
            }
            subtitle="Designed around the business, the audience and the experience."
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-[13px] leading-relaxed text-brown-muted lg:text-right">
              Website concepts across the industries we serve. Each project opens as a small gallery.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter projects by category">
            <div className="flex w-max gap-2 sm:flex-wrap">
              {filters.map((f) => {
                const isActive = f === active;
                return (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(f)}
                    className={cn(
                      "relative h-10 whitespace-nowrap rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-cream" : "border border-burgundy/15 text-burgundy hover:border-burgundy/40 hover:bg-pink-light/40"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-burgundy shadow-[0_14px_30px_-14px_rgba(90,31,43,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{f}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.div
                key={p.key}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard p={p} onOpen={() => setOpen(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-16 lg:mt-20">
          <div className="card-sand relative flex flex-col items-start gap-6 overflow-hidden p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(207,166,163,0.45),transparent_65%)]" />
            <div className="relative">
              <h3 className="display font-display text-[1.75rem] font-normal leading-tight text-burgundy sm:text-[2.2rem]">
                Want a website like this <span className="display-italic">for your business?</span>
              </h3>
              <p className="mt-2 text-brown-muted">Tell us about your business and we'll show you what's possible.</p>
            </div>
            <div className="relative shrink-0">
              <Button size="lg" onClick={() => startWith("Website Development")}>
                Get My Website
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>{open && <Lightbox key={open.key} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
