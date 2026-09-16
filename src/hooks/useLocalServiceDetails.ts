import { useCallback, useEffect, useState } from "react";
import { LOCAL_SERVICE_IDS, type LocalServiceId } from "@/lib/localServices";
import { scrollToId } from "@/lib/scroll";

function serviceAtHash(): LocalServiceId | null {
  if (typeof window === "undefined") return null;
  return LOCAL_SERVICE_IDS.find((id) => window.location.hash === `#${id}`) ?? null;
}

export function useLocalServiceDetails() {
  const [activeService, setActiveService] = useState<LocalServiceId | null>(serviceAtHash);

  useEffect(() => {
    const syncHash = () => setActiveService(serviceAtHash());
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const exploreService = useCallback((id: LocalServiceId) => {
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(window.history.state, "", `#${id}`);
    }
    setActiveService(id);
    if (activeService === id) scrollToId(id);
  }, [activeService]);

  const closeService = useCallback(() => {
    const cardId = activeService ? `${activeService}-card` : "services";
    setActiveService(null);
    if (serviceAtHash()) window.history.replaceState(window.history.state, "", "#services");
    window.requestAnimationFrame(() => {
      document.getElementById(cardId)?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
      scrollToId(cardId);
    });
  }, [activeService]);

  return { activeService, exploreService, closeService };
}