export const site = {
  name: "Samya Digital Agency",
  shortName: "SAMYA",
  handle: "@sitesbysamya",
  instagram: "https://www.instagram.com/sitesbysamya?igsi=MTFmcHc5a3k4aWExeg==",
  phoneDisplay: "+91 8369541282",
  phoneTel: "tel:+918369541282",
  whatsappNumber: "918369541282",
  whatsappMessage: "Hi Samya Digital Agency, I’d like to know more about your services.",
  tagline: "Websites • Google Business Profile • Customer Reactivation",
  footerTagline: "Websites. Google Presence. Customer Retention.",
};

export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const industries = [
  "Salons",
  "Spas",
  "Clinics",
  "Hotels",
  "Resorts",
  "Cafes",
  "Restaurants",
  "Gyms",
  "Fitness",
  "Travel & Tours",
  "Real Estate",
  "Local Services",
];
