import { siteConfig } from "@/lib/site";

export type TemplateDefinition = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  isPremium: boolean;
  prefillData: Record<string, string | boolean>;
};

export const launchChecklist = [
  "Complete a Texas-accredited food handler training course.",
  "Confirm your product falls within current Texas cottage food allowances.",
  "Write your standard label with product name, business name, ingredients, allergens, address or registration number, and disclosure.",
  "Prepare ingredient and allergen source notes for every recipe.",
  "Set up packaging that protects the product from contamination.",
  "Decide which direct-sale channels you will use first.",
  "Prepare a market-day bin with labels, bags, wipes, signage, and receipts.",
];

export const marketChecklist = [
  "Bring printed labels or invoices for every packaged or oversized product.",
  "Carry backup ingredient lists and allergen notes.",
  "Display the private-residence disclosure where needed for vendor sales.",
  "Pack gloves, wipes, sanitizer, pens, tape, and spare packaging.",
  "Separate ready-to-sell inventory from samples and damaged product.",
  "If selling TCS foods, verify temperature control and safe handling statement placement.",
  "Document the date-made field for TCS items and vendor-sold items.",
];

export const faqItems = [
  {
    question: "Do I need a cottage food license in Texas?",
    answer:
      "Texas DSHS states cottage food production operations are exempt from standard food establishment licensing and inspection requirements, but some operators now must register with DSHS starting September 1, 2025.",
  },
  {
    question: "What must be on a Texas cottage food label?",
    answer:
      "The label must include the operation name, address or DSHS registration number, common product name, ingredient allergen information, and the required private-residence disclosure. Some categories also need date-made and safe-handling statements.",
  },
  {
    question: "Can I sell online?",
    answer:
      "Yes, when the consumer buys directly from you online, the required label information is shown before payment, and you or your employee or household member personally delivers the order.",
  },
];

export const eligibilityCatalog = [
  {
    slug: "cookies",
    name: "Cookies and brownies",
    status: "likely allowed",
    summary: "Non-TCS baked goods are commonly compatible with Texas cottage food rules.",
    channel: "Direct sales, pickup, personal delivery, and many farmers market settings.",
  },
  {
    slug: "caramels",
    name: "Candy and brittles",
    status: "likely allowed",
    summary: "Shelf-stable candies generally fit the cottage food model.",
    channel: "Direct sales and market sales are usually the primary workflow.",
  },
  {
    slug: "cheesecake",
    name: "Cheesecake and cream pies",
    status: "needs review",
    summary: "These products are often time/temperature control for safety foods and need extra handling, labeling, and registration review.",
    channel: "Allowed only when the operator follows current TCS rules; confirm category specifics carefully.",
  },
  {
    slug: "meat-jerky",
    name: "Meat, poultry, and seafood products",
    status: "not supported by app guidance",
    summary: "Texas DSHS excludes meat, poultry, seafood, and shellfish products from cottage food coverage.",
    channel: "Use a different regulated production path.",
  },
  {
    slug: "cbd-baked-goods",
    name: "CBD or THC-infused foods",
    status: "not supported by app guidance",
    summary: "Texas DSHS excludes products containing cannabidiol or tetrahydrocannabinol from cottage food operations.",
    channel: "Not eligible under cottage food rules.",
  },
];

export const templates: TemplateDefinition[] = [
  {
    slug: "classic-cookie-label",
    title: "Classic Cookie Label",
    category: "Cookies",
    summary: "A shelf-stable chocolate chip cookie label with allergen callouts.",
    isPremium: false,
    prefillData: {
      title: "Saturday Market Cookies",
      businessName: "Bluebonnet Bake Table",
      productName: "Chocolate Chip Cookies",
      ingredients: "Flour, butter, brown sugar, sugar, eggs, chocolate chips, vanilla, baking soda, salt",
      allergenStatement: "Contains: Wheat, Milk, Egg, Soy",
      netQuantity: "Net Wt. 12 oz (340 g)",
      contactCity: "Austin",
      contactState: "TX",
      contactZip: "78704",
      addressLine: "123 Market Lane",
      notes: "Great for first market weekends.",
      isTcsFood: false,
      safeHandling: false,
    },
  },
  {
    slug: "fudge-gift-box",
    title: "Fudge Gift Box",
    category: "Candy",
    summary: "A polished confection label for gift packs and holiday boxes.",
    isPremium: true,
    prefillData: {
      title: "Holiday Fudge Box",
      businessName: "Lone Star Confections",
      productName: "Chocolate Walnut Fudge",
      ingredients: "Sugar, condensed milk, chocolate, butter, vanilla, walnuts, salt",
      allergenStatement: "Contains: Milk, Tree Nuts",
      netQuantity: "Net Wt. 8 oz (227 g)",
      contactCity: "Waco",
      contactState: "TX",
      contactZip: "76701",
      addressLine: "55 Candy Row",
      notes: "Use gold sticker stock for gifting.",
      isTcsFood: false,
      safeHandling: false,
    },
  },
  {
    slug: "farmers-market-brownies",
    title: "Farmers Market Brownies",
    category: "Markets",
    summary: "A market-focused brownie label paired with signage reminders.",
    isPremium: true,
    prefillData: {
      title: "Market Brownie Batch",
      businessName: "Porch Light Bakes",
      productName: "Fudge Brownies",
      ingredients: "Sugar, flour, cocoa, butter, eggs, vanilla, salt",
      allergenStatement: "Contains: Wheat, Milk, Egg",
      netQuantity: "Net Wt. 10 oz (283 g)",
      contactCity: "Dallas",
      contactState: "TX",
      contactZip: "75201",
      addressLine: "88 Elm Street",
      notes: "Pair with QR menu board and ingredient backup sheet.",
      isTcsFood: false,
      safeHandling: false,
    },
  },
  {
    slug: "tcs-review-label",
    title: "TCS Review Label",
    category: "Review",
    summary: "A refrigerated item example that surfaces date-made and safe-handling requirements.",
    isPremium: false,
    prefillData: {
      title: "Refrigerated Review Example",
      businessName: "Hill Country Home Kitchen",
      productName: "Refrigerated Mini Cheesecakes",
      ingredients: "Cream cheese, sugar, eggs, vanilla, graham crumbs, butter",
      allergenStatement: "Contains: Milk, Egg, Wheat",
      netQuantity: "Net Wt. 16 oz (454 g)",
      contactCity: "San Marcos",
      contactState: "TX",
      contactZip: "78666",
      addressLine: "14 River Bend",
      madeOnDate: "2026-05-01",
      notes: "Requires temperature control and registration review.",
      isTcsFood: true,
      safeHandling: true,
    },
  },
];

export const blogPosts = [
  {
    slug: "first-texas-market-cookie-seller",
    title: "How a First-Time Texas Cookie Seller Can Prep for Market Day",
    excerpt:
      "A practical sequence for moving from recipe to labeled inventory, signage, and a calm first market morning.",
    body: [
      "Start by locking your three simplest products and writing one standard label per product before you print anything. That keeps your first market from turning into a live compliance workshop.",
      "Next, build a single backup document with ingredients, allergens, and pricing. Keep a printed copy in your market tub and a digital copy on your phone.",
      "Finally, rehearse your table flow: where labels sit, where backup inventory sits, and how customers see your disclosure and ingredient notes without asking.",
    ],
  },
  {
    slug: "texas-cottage-food-online-sales-checklist",
    title: "Texas Cottage Food Online Sales Checklist",
    excerpt:
      "A plain-English summary of what needs to happen before a direct online order is accepted.",
    body: [
      "Before the order is paid, publish the required label information on the product page or checkout flow in a way the buyer can actually read.",
      "Keep delivery under your control. Texas DSHS guidance says the operator, an employee, or a household member must personally deliver the food to the consumer.",
      "After payment, the product still needs a compliant physical label with the address or registration number attached to the food.",
    ],
  },
];

export const citationBullets = [
  "Texas DSHS says packaged cottage foods must include the operation name, address or registration number, product name, allergen disclosure, and the private-residence disclosure.",
  "Starting September 1, 2025, some operators can use a DSHS registration number on labels instead of a physical home address.",
  "Operators selling TCS foods need added handling controls, label statements, and date-made fields.",
];

export const disclaimer =
  "Informational workflow assistance only. This app does not provide legal advice, and sellers should review the current Texas DSHS guidance for category-specific questions.";

export const homepageStats = [
  { label: "Required label fields covered", value: "8+" },
  { label: "Reusable templates included", value: "4" },
  { label: "Primary seller workflows", value: "5" },
  { label: "Official Texas sources linked", value: "3" },
];

export const trainingResources = [
  "Food handler training reminder and launch sequencing",
  "Printable cohort exercises for label review",
  "Market-day readiness worksheet",
  "Source-linked educator talking points",
];

export const seoPages = [
  "/texas-cottage-food-law",
  "/texas-cottage-food-label-generator",
  "/texas-cottage-food-label-requirements",
  "/texas-cottage-food-label-template",
  "/texas-cottage-food-permit",
  "/texas-cottage-food-license",
  "/farmers-market-texas-cottage-food-label",
  "/texas-cottage-food-checklist",
  "/texas-cottage-food-training",
  "/can-i-sell-this-in-texas",
];

export const directSalesRules = [
  "Online sales are allowed when the consumer buys directly from the operator and sees the label information before payment.",
  "The operator, employee, or household member must personally deliver online orders to the consumer.",
  "Many direct-sale and market workflows stay exempt from local permit requirements, but sellers should still confirm venue policies.",
  "Cottage food vendors and TCS sellers now have extra registration-related considerations under current DSHS guidance.",
];

export const labelDisclosureHelp = [
  "Use your DSHS registration number in place of the address only if you actually hold that registration.",
  "Allergen notes should call out eggs, tree nuts, soy, peanuts, milk, wheat, and sesame when present.",
  `The required disclosure must appear as written: "${siteConfig.disclosure}"`,
  "TCS foods and foods sold by a cottage food vendor need a date-made field.",
];
