export const siteConfig = {
  brandName: "MagicLens",
  legacyBrandName: "AI Moments",
  legalOperatorName: "AI Moments Inc.",
  siteUrl: "https://ai-moments.com",
  supportEmail: "orders@ai-moments.com",
  legalEffectiveDate: "March 13, 2026",
  themeColor: "#2C3646",
  defaultOgImage: "/images/home-preview.jpg",
  productTagline: "Premium AI video memories",
  description:
    "MagicLens turns real rooms, rituals, and family milestones into premium AI video memories from one uploaded image.",
  experienceDestinations: {
    santa: "https://santa-video.com",
    "easter-bunny": "https://easterbunny-video.com",
    "tooth-fairy": "https://toothfairy-video.com"
  },
  primaryNav: [
    { label: "Experiences", href: "/experiences/" },
    { label: "Studio", href: "/studio/" },
    { label: "Company", href: "/about/" }
  ],
  footerGroups: [
    {
      title: "Platform",
      links: [
        { label: "Experiences", href: "/experiences/" },
        { label: "Studio", href: "/studio/" },
        { label: "Company", href: "/about/" },
        { label: "Pricing", href: "/pricing/" }
      ]
    },
    {
      title: "Live Workflows",
      links: [
        { label: "Santa Sighting", href: "/experiences/santa/" },
        { label: "Easter Bunny Visit", href: "/experiences/easter-bunny/" },
        { label: "Tooth Fairy Visit", href: "/experiences/tooth-fairy/" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about/" },
        { label: "Privacy", href: "/privacy/" },
        { label: "Terms", href: "/terms/" },
        { label: "Contact", href: "mailto:orders@ai-moments.com" }
      ]
    }
  ]
};

export const proofStrip = [
  {
    label: "Primary input",
    value: "Image-led creation",
    description: "Upload a real scene, portrait, or room photo and route it into the right workflow."
  },
  {
    label: "Live now",
    value: "3 guided workflows",
    description: "Santa, Easter Bunny, and Tooth Fairy are already launchable from the studio surface."
  },
  {
    label: "Studio direction",
    value: "Unified product shell",
    description: "One platform language across guided modes, examples, and future creative tooling."
  }
];

export const studioModules = [
  {
    eyebrow: "Generative core",
    title: "Gen Space",
    description:
      "Build a result from an uploaded image, prompt guidance, and workflow presets inside a dedicated creation canvas.",
    bullets: ["Image-led input", "Prompt plus reference framing", "Reusable workflow surface"]
  },
  {
    eyebrow: "Direction",
    title: "Control Surface",
    description:
      "Guide the scene with tighter input framing, output targets, and workflow-specific controls instead of a generic upload form.",
    bullets: ["Workflow routing", "Guided scene control", "Output-focused settings"]
  },
  {
    eyebrow: "Consistency",
    title: "Style System",
    description:
      "Apply repeatable looks across seasonal magic, keepsakes, toy concepts, and broader studio workflows as the catalog expands.",
    bullets: ["Preset looks", "Mood continuity", "Consistent visual language"]
  },
  {
    eyebrow: "Reusable assets",
    title: "Elements",
    description:
      "Keep characters, locations, objects, and room context coherent across variations and future project-based workflows.",
    bullets: ["Scene anchors", "Variation support", "Project-ready direction"]
  }
];

export const startingPoints = [
  {
    title: "From an Image",
    status: "Live now",
    description: "Bring a room, bedroom, portrait, or toy photo and launch the best-fit workflow from that image."
  },
  {
    title: "From a Look",
    status: "Coming soon",
    description: "Start with a preset visual direction and tune the workflow around a specific mood or branded style."
  },
  {
    title: "From a Story",
    status: "Coming soon",
    description: "Begin from a narrative idea, then shape the visual result with image references and studio controls."
  },
  {
    title: "From an Existing Output",
    status: "Coming soon",
    description: "Reuse an earlier result to branch into alternate edits, variants, and follow-on creative directions."
  }
];

export const studioFlow = [
  {
    step: "Ingest",
    description: "Start from the real image or scene that should anchor the result."
  },
  {
    step: "Route",
    description: "Send that input into the workflow that best fits the moment, mood, or use case."
  },
  {
    step: "Direct",
    description: "Refine the output with guided controls, style framing, and capability modules."
  },
  {
    step: "Deliver",
    description: "Generate the polished result, then expand into more advanced studio tooling over time."
  }
];

export const pricingTracks = [
  {
    title: "Workflow access",
    availability: "Available today",
    description:
      "Launch the live guided workflows from MagicLens and continue into the current creation surfaces behind them.",
    bullets: [
      "Image-led guided workflows",
      "Current live handoff to dedicated creation domains",
      "No required account for today’s live flows"
    ]
  },
  {
    title: "Studio plans",
    availability: "Planned",
    description:
      "Future platform access for broader studio modules, saved work, and expanded creative controls.",
    bullets: [
      "Preset and style workflows",
      "Saved projects and reusable assets",
      "More advanced output control"
    ]
  },
  {
    title: "Team workspace",
    availability: "Planned",
    description:
      "A later product tier for shared review, collaboration, and workflow handoff once projects and accounts exist.",
    bullets: [
      "Shared workspaces",
      "Feedback and review flows",
      "Collaboration-ready project structure"
    ]
  }
];

export function canonicalUrl(pathname = "/") {
  return new URL(pathname, siteConfig.siteUrl).toString();
}
