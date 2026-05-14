export const siteConfig = {
  name: "Texas Cottage Food Compliance Hub",
  shortName: "Compliance Hub",
  description:
    "Generate Texas cottage food labels, check product eligibility, prep for market day, and save compliance workflows in one Texas-focused workspace.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  sourceUrl: "https://www.dshs.texas.gov/foodestablishments/cottagefood",
  farmersMarketUrl:
    "https://www.dshs.texas.gov/retail-food-establishments/texas-farmers-market",
  statuteUrl: "https://statutes.capitol.texas.gov/docs/hs/htm/hs.437.htm",
  disclosure:
    "THIS PRODUCT WAS PRODUCED IN A PRIVATE RESIDENCE THAT IS NOT SUBJECT TO GOVERNMENTAL LICENSING OR INSPECTION.",
  safeHandling:
    "SAFE HANDLING INSTRUCTIONS: To prevent illness from bacteria, keep this food refrigerated or frozen until the food is prepared for consumption.",
  trainingRule:
    "Texas operators must complete an accredited basic food safety education or training program for food handlers.",
};

export const sourceNotes = [
  {
    title: "Texas DSHS Cottage Food Production",
    href: siteConfig.sourceUrl,
    note: "Official current guidance for labeling, direct sales, TCS rules, training, and registration changes.",
  },
  {
    title: "Texas DSHS Farmers Market Guidance",
    href: siteConfig.farmersMarketUrl,
    note: "Market-specific context for packaged cottage foods and permit expectations at Texas farmers markets.",
  },
  {
    title: "Texas Health and Safety Code Chapter 437",
    href: siteConfig.statuteUrl,
    note: "Underlying statutory framework referenced by the app for cottage food operations.",
  },
];

export const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Learn the rules, generate a one-off label, and preview checklists.",
    features: [
      "Law and requirements pages",
      "Live label preview",
      "One no-save print export",
      "Checklist previews",
    ],
  },
  {
    id: "solo",
    name: "Solo",
    price: "$19/mo",
    description: "For first-time sellers who want saved labels and reusable workflows.",
    features: [
      "Save up to 25 labels and checklists",
      "PDF export",
      "Template library",
      "Eligibility checker history",
    ],
  },
  {
    id: "seller-pro",
    name: "Seller Pro",
    price: "$39/mo",
    description: "For active market sellers managing multiple products and events.",
    features: [
      "Unlimited saved labels",
      "Batch-ready templates",
      "Seasonal market prep workspace",
      "Priority support cues",
    ],
  },
  {
    id: "educator",
    name: "Educator Toolkit",
    price: "$199",
    description: "One-time classroom and cohort materials for local programs and trainers.",
    features: [
      "Printable teaching packet",
      "Sample labels and exercises",
      "Reusable cohort checklist pack",
      "Facilitator handout",
    ],
  },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
