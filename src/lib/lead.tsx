import { createContext, useContext, useState, type ReactNode } from "react";
import { scrollToId } from "./scroll";

export const NEEDS = [
  "Website Development",
  "Google Business Profile",
  "Customer Reactivation & Retention",
  "Google Review Management",
  "Google Business Profile Management",
  "Multiple Services",
] as const;

export type Need = "" | (typeof NEEDS)[number];

type LeadContextValue = {
  need: Need;
  setNeed: (need: Need) => void;
  /** Pre-select a service and scroll to the consultation form. */
  startWith: (need: Need) => void;
};

const LeadContext = createContext<LeadContextValue>({
  need: "",
  setNeed: () => {},
  startWith: () => {},
});

export function LeadProvider({ children }: { children: ReactNode }) {
  const [need, setNeed] = useState<Need>("");
  const startWith = (n: Need) => {
    setNeed(n);
    scrollToId("contact");
  };
  return <LeadContext.Provider value={{ need, setNeed, startWith }}>{children}</LeadContext.Provider>;
}

export const useLead = () => useContext(LeadContext);
