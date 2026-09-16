import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { Phone, WhatsApp } from "./ui/Icons";

/** Mobile: fixed Call / WhatsApp bar. Desktop: a discreet WhatsApp pill after the hero. */
export function ContactDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 200;
      setShow(y > window.innerHeight * 0.7 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="border-t border-burgundy/10 bg-cream/90 px-4 py-2.5 shadow-[0_-16px_40px_-24px_rgba(90,31,43,0.4)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={site.phoneTel}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-burgundy/25 text-[12px] font-semibold uppercase tracking-[0.16em] text-burgundy"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-burgundy text-[12px] font-semibold uppercase tracking-[0.16em] text-cream"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Desktop WhatsApp pill */}
      <AnimatePresence>
        {show && (
          <motion.a
            key="wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Samya Digital Agency on WhatsApp"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-3 rounded-full border border-burgundy/10 bg-cream/90 py-2 pl-2 pr-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-burgundy shadow-[0_24px_50px_-20px_rgba(90,31,43,0.5)] backdrop-blur-xl transition hover:border-burgundy/30 md:flex"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-wa/15 text-wa">
              <span className="absolute inset-0 rounded-full border border-wa/40 animate-pulse-ring [animation-duration:3s]" />
              <WhatsApp className="h-5 w-5" />
            </span>
            WhatsApp Samya
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
