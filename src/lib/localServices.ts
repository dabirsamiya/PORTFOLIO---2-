import type { Need } from "./lead";

export const LOCAL_SERVICE_IDS = [
  "google-review-management",
  "google-business-profile-management",
] as const;

export type LocalServiceId = (typeof LOCAL_SERVICE_IDS)[number];

export type ServiceFeature = {
  id: string;
  title: string;
  description: string;
  points?: string[];
  relatedService?: LocalServiceId;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type LocalService = {
  id: LocalServiceId;
  name: string;
  need: Need;
  positioning: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  features: ServiceFeature[];
  workflow: WorkflowStep[];
  metaDescription: string;
  keywords: string[];
};

export const localServices: Record<LocalServiceId, LocalService> = {
  "google-review-management": {
    id: "google-review-management",
    name: "Google Review Management",
    need: "Google Review Management",
    positioning: "Turn customer feedback into a stronger local reputation.",
    shortDescription:
      "Build trust, respond to customers, and turn genuine feedback into a stronger local reputation.",
    description:
      "We help local businesses actively manage their Google reviews, respond professionally to customer feedback, encourage genuine customer reviews, and maintain a strong online reputation.",
    highlights: [
      "Review Monitoring",
      "Professional Responses",
      "Genuine Review Requests",
      "Policy-Violation Reporting",
      "Reputation Reporting",
      "Customer Feedback Insights",
    ],
    features: [
      {
        id: "monitoring",
        title: "Review Monitoring",
        description: "Monitor new Google reviews and identify reviews that need responses.",
      },
      {
        id: "responses",
        title: "Professional Review Responses",
        description:
          "Create personalized, professional responses for positive, neutral, and negative customer feedback.",
      },
      {
        id: "negative-reviews",
        title: "Negative Review Handling",
        description:
          "Respond calmly and professionally to genuine complaints and identify opportunities for service improvement.",
      },
      {
        id: "policy-reporting",
        title: "Policy-Violation Reporting",
        description:
          "Identify reviews that may violate Google's review policies and guide the business through the appropriate reporting process. Google decides whether a review qualifies for removal; removal is never guaranteed.",
      },
      {
        id: "genuine-feedback",
        title: "Genuine Review Generation",
        description:
          "Create customer-friendly WhatsApp messages, QR codes, and follow-up workflows that encourage genuine customer feedback. Requests welcome honest experiences, without incentives or selectively asking only satisfied customers.",
      },
      {
        id: "templates",
        title: "Review Response Templates",
        description:
          "Create customized response templates based on the business's tone, industry, and common customer situations. Each response is adapted to the actual feedback before use.",
      },
      {
        id: "reporting",
        title: "Monthly Reputation Reporting",
        description:
          "Track review volume, ratings, response rate, recurring feedback themes, and customer sentiment.",
      },
      {
        id: "insights",
        title: "Customer Feedback Insights",
        description:
          "Identify recurring complaints, frequently praised services, and areas where the business can improve its customer experience.",
      },
    ],
    workflow: [
      { title: "Monitor", description: "We track incoming reviews and identify responses that need attention." },
      { title: "Respond", description: "We create thoughtful, brand-aligned responses." },
      { title: "Encourage", description: "We build simple workflows to request genuine customer feedback." },
      { title: "Analyze", description: "We identify recurring feedback and reputation trends." },
      { title: "Improve", description: "We turn customer feedback into actionable business insights." },
    ],
    metaDescription:
      "Google Review Management for local businesses: review monitoring, professional responses, genuine feedback requests, and online reputation management by Samya.",
    keywords: [
      "Google Review Management",
      "Online Reputation Management",
      "Google Business Profile Review Management",
      "Local Business Reputation Management",
    ],
  },
  "google-business-profile-management": {
    id: "google-business-profile-management",
    name: "Google Business Profile Management",
    need: "Google Business Profile Management",
    positioning: "Get discovered locally. Look professional. Turn searches into customers.",
    shortDescription:
      "Complete Google Business Profile optimization and ongoing management designed to improve your local presence and customer engagement.",
    description:
      "We optimize and manage your Google Business Profile so local customers can find your business, understand your services, and take action.",
    highlights: [
      "Profile Optimization",
      "Categories & Services",
      "Photos & Google Posts",
      "Review Management",
      "Local SEO",
      "Insights & Reporting",
    ],
    features: [
      {
        id: "optimization",
        title: "Profile Setup & Optimization",
        description:
          "Set up or optimize the business profile with accurate business information, categories, description, hours, contact details, website and relevant business attributes.",
      },
      {
        id: "categories",
        title: "Category Optimization",
        description:
          "Review the primary and relevant secondary categories to accurately represent the business.",
      },
      {
        id: "description",
        title: "Business Description",
        description:
          "Create a professional, locally relevant business description aligned with the business and its services.",
      },
      {
        id: "services",
        title: "Services Management",
        description:
          "Organize and optimize the services section so customers can quickly understand what the business offers.",
      },
      {
        id: "photos",
        title: "Photos & Visual Content",
        description:
          "Organize and recommend high-quality photos for the profile, including services, team, interiors, products and business location.",
      },
      {
        id: "posts",
        title: "Google Posts",
        description: "Create relevant Google Business Profile posts for your business.",
        points: ["Offers", "Updates", "Services", "Events", "Announcements"],
      },
      {
        id: "reviews",
        title: "Review Management",
        description: "Monitor incoming reviews and provide professional responses to customer feedback.",
        relatedService: "google-review-management",
      },
      {
        id: "local-seo",
        title: "Local SEO",
        description:
          "Optimize profile information and content around relevant local search intent without keyword stuffing.",
      },
      {
        id: "links",
        title: "Website & Action Links",
        description:
          "Connect the profile with the correct website and relevant customer action links where available.",
      },
      {
        id: "monitoring",
        title: "Profile Monitoring",
        description:
          "Monitor important profile information and identify areas that require updates.",
      },
      {
        id: "reporting",
        title: "Insights & Reporting",
        description:
          "Create monthly reports showing available profile performance metrics. Availability depends on the business profile and the data Google provides.",
        points: [
          "Search visibility",
          "Customer interactions",
          "Website clicks",
          "Direction requests",
          "Phone calls",
          "Review growth",
        ],
      },
    ],
    workflow: [
      { title: "Audit", description: "We review your existing Google Business Profile and identify opportunities." },
      { title: "Optimize", description: "We improve the profile structure, information, categories and services." },
      { title: "Manage", description: "We maintain profile content, posts, photos and customer interactions." },
      { title: "Monitor", description: "We track available performance insights and profile activity." },
      { title: "Report", description: "We provide a clear monthly summary of activity and key metrics." },
    ],
    metaDescription:
      "Google Business Profile Management by Samya: profile optimization, Google Posts, reviews, local SEO, and clear reporting for local business owners.",
    keywords: [
      "Google Business Profile Management",
      "Google Business Profile Optimization",
      "GBP Management",
      "Google Maps Business Management",
      "Local Business Profile Management",
      "Local SEO Services",
    ],
  },
};

// These values belong only to the explicitly labeled concept dashboards.
export const DEMO_REPUTATION = {
  business: "\u00c9LANE Beauty Studio",
  rating: 4.8,
  totalReviews: 248,
  newReviews: 24,
  responseRate: 98,
  profileHealth: 92,
  posts: 12,
  websiteClicks: 184,
  directions: 96,
  calls: 127,
  distribution: [
    { stars: 5, count: 192 },
    { stars: 4, count: 38 },
    { stars: 3, count: 10 },
    { stars: 2, count: 5 },
    { stars: 1, count: 3 },
  ],
};

export const DEMO_REVIEWS = [
  {
    id: "positive-example",
    tone: "positive",
    label: "Positive feedback",
    stars: 5,
    text: "Absolutely loved the service. The staff was amazing!",
    response:
      "Thank you so much for your wonderful feedback! We're delighted you enjoyed your experience and look forward to welcoming you again.",
  },
  {
    id: "negative-example",
    tone: "negative",
    label: "A concern to address",
    stars: 2,
    text: "My appointment started 25 minutes late, and I wasn't kept updated about the wait.",
    response:
      "Thank you for letting us know. We're sorry for the delay and the lack of communication. Please contact our team privately with your visit details so we can look into what happened and work on a better experience.",
  },
] as const;