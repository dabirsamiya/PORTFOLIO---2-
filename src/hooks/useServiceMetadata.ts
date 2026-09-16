import { useEffect } from "react";
import type { LocalService } from "@/lib/localServices";
import { site } from "@/lib/site";

export function useServiceMetadata(service: LocalService, active: boolean) {
  useEffect(() => {
    if (!active) return;

    const previousTitle = document.title;
    const title = `${service.name} | ${site.name}`;
    const updates = [
      { attribute: "name", key: "description", content: service.metaDescription },
      { attribute: "name", key: "keywords", content: service.keywords.join(", ") },
      { attribute: "property", key: "og:title", content: title },
      { attribute: "property", key: "og:description", content: service.metaDescription },
      { attribute: "name", key: "twitter:title", content: title },
      { attribute: "name", key: "twitter:description", content: service.metaDescription },
    ];

    document.title = title;
    const snapshots = updates.map(({ attribute, key, content }) => {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const created = !node;
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, key);
        document.head.appendChild(node);
      }
      const previous = node.getAttribute("content");
      node.setAttribute("content", content);
      return { node, previous, created };
    });

    // Keep the original homepage metadata outside the expanded service view.
    return () => {
      document.title = previousTitle;
      snapshots.forEach(({ node, previous, created }) => {
        if (created) node.remove();
        else if (previous === null) node.removeAttribute("content");
        else node.setAttribute("content", previous);
      });
    };
  }, [service, active]);
}