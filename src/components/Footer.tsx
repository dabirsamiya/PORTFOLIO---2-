import type { MouseEvent } from "react";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { Button } from "./ui/Button";
import { Instagram, Phone, WhatsApp } from "./ui/Icons";

export function Footer() {
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToId(href.slice(1));
  };
  return (
    <footer className="relative bg-burgundy-deep text-cream">
      <div className="hairline via-pink/40" />
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <a href="#top" onClick={(e) => go(e, "#top")} className="font-display text-[19px] font-medium tracking-[0.26em]">
              SAMYA DIGITAL AGENCY
            </a>
            <p className="display-italic mt-4 text-[1.5rem] text-pink-light">{site.footerTagline}</p>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-cream/60">
              We help local businesses build a stronger digital presence and generate more value from the customers they already have.
            </p>
            <div className="mt-7">
              <Button href="#contact" variant="light">
                Get Started
              </Button>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-pink-light/80">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="text-[15px] text-cream/75 transition hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-pink-light/80">Contact</p>
            <div className="mt-4 flex flex-col gap-3">
              <a href={site.phoneTel} className="inline-flex items-center gap-3 text-[15px] text-cream/80 transition hover:text-cream">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15">
                  <Phone className="h-4 w-4" />
                </span>
                {site.phoneDisplay}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[15px] text-cream/80 transition hover:text-cream">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15">
                  <WhatsApp className="h-4 w-4 text-wa" />
                </span>
                WhatsApp {site.phoneDisplay}
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[15px] text-cream/80 transition hover:text-cream">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15">
                  <Instagram className="h-4 w-4" />
                </span>
                {site.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[12.5px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em]">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
