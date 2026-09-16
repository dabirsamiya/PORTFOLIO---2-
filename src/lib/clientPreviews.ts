const localCaptures = import.meta.glob<string>("/src/assets/clients/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Prefer the original captures when available; missing files must not break the build.
function preview(filename: string, website: string, width: number, height: number) {
  return localCaptures[`/src/assets/clients/${filename}`]
    ?? `https://s0.wp.com/mshots/v1/${encodeURIComponent(website)}?w=${width}&h=${height}&vpw=${width}&vph=${height}`;
}

export const ayeshaDesktop = preview("ayesha-desktop.jpg", "https://ayeshasalon.com/", 1200, 750);
export const ayeshaMobile = preview("ayesha-mobile.jpg", "https://ayeshasalon.com/", 390, 844);
export const spaDesktop = preview("russian-spa-desktop.jpg", "https://russian-home-hotel-spa.vercel.app/", 1200, 750);
export const spaMobile = preview("russian-spa-mobile.jpg", "https://russian-home-hotel-spa.vercel.app/", 390, 844);