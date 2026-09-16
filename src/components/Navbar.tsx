import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { Button } from "./ui/Button";
import { ArrowUpRight, Instagram, Menu, Phone, WhatsApp, X } from "./ui/Icons";

function Logo({ onClick }: { onClick: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="Samya Digital Agency — back to top"
      className="flex items-center gap-3 font-display text-[19px] font-medium tracking-[0.26em] text-burgundy"
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-pink animate-pulse-ring" />
        <span className="relative h-2 w-2 rounded-full bg-burgundy" />
      </span>
      SAMYA
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(href.slice(1)), open ? 60 : 0);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          aria-label="Primary"
          className={cn(
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
            scrolled
              ? "border-b border-burgundy/10 bg-cream/85 shadow-[0_18px_50px_-30px_rgba(90,31,43,0.35)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo onClick={(e) => go(e, "#top")} />

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="group relative rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-[0.14em] text-brown/75 transition-colors duration-300 hover:text-burgundy"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-burgundy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <a
                href={site.phoneTel}
                className="hidden h-11 items-center gap-2 rounded-full border border-burgundy/15 px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:border-burgundy/40 xl:inline-flex"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <Button href="#contact" size="sm" className="hidden sm:inline-flex">
                Get Started
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/15 bg-cream-2/60 text-burgundy transition hover:border-burgundy/40 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-cream lg:hidden"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Logo onClick={(e) => go(e, "#top")} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/15 text-burgundy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="container-x flex flex-1 flex-col justify-center" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between border-b border-burgundy/10 py-4 font-display text-[2.35rem] font-light tracking-[-0.01em] text-burgundy"
                >
                  {l.label}
                  <ArrowUpRight className="h-6 w-6 text-pink-deep transition group-hover:text-burgundy" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="container-x flex flex-col gap-3 pb-8"
            >
              <Button href="#contact" size="lg" onClick={() => setOpen(false)} className="w-full">
                Get a Free Consultation
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <a href={site.phoneTel} className="flex h-12 items-center justify-center gap-2 rounded-full border border-burgundy/15 text-[12px] font-semibold uppercase tracking-[0.12em] text-burgundy">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full border border-burgundy/15 text-[12px] font-semibold uppercase tracking-[0.12em] text-burgundy">
                  <WhatsApp className="h-4 w-4 text-wa" /> WhatsApp
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full border border-burgundy/15 text-[12px] font-semibold uppercase tracking-[0.12em] text-burgundy">
                  <Instagram className="h-4 w-4" /> Insta
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
