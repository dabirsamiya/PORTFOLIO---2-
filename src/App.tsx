import { MotionConfig } from "framer-motion";
import { useLenis } from "@/lib/scroll";
import { LeadProvider } from "@/lib/lead";
import { Navbar } from "@/components/Navbar";
import { Hero, IntroStrip } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Services } from "@/components/Services";
import { Conversion } from "@/components/Conversion";
import { Clients } from "@/components/Clients";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { WhySamya } from "@/components/WhySamya";
import { About } from "@/components/About";
import { LeadForm } from "@/components/LeadForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ContactDock } from "@/components/ContactDock";
import { Cursor } from "@/components/ui/Cursor";

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <LeadProvider>
        <div className="grain relative min-h-screen bg-cream pb-[76px] text-brown md:pb-0">
          <a
            href="#contact"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-burgundy focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to contact form
          </a>
          <Navbar />
          <main>
            <Hero />
            <IntroStrip />
            <Problem />
            <Solution />
            <Services />
            <Conversion />
            <Clients />
            <Portfolio />
            <Process />
            <WhySamya />
            <About />
            <LeadForm />
            <FinalCTA />
          </main>
          <Footer />
          <ContactDock />
          <Cursor />
        </div>
      </LeadProvider>
    </MotionConfig>
  );
}
