import { defineCollection, z } from "astro:content";

const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  alt: z.string(),
  poster: z.string().optional(),
  caption: z.string().optional()
});

const stepSchema = z.object({
  title: z.string(),
  description: z.string()
});

const experiences = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publicLabel: z.string(),
    status: z.enum(["live", "coming-soon"]),
    category: z.string(),
    outputType: z.string(),
    inputType: z.string(),
    startingPoint: z.string(),
    capabilities: z.array(z.string()),
    mockupVariant: z.string(),
    isFlagship: z.boolean(),
    audienceMode: z.enum(["prosumer", "family-keepsake", "studio-forward"]),
    summary: z.string(),
    cardSummary: z.string(),
    eyebrow: z.string(),
    longDescription: z.string(),
    heroMedia: mediaSchema,
    previewMedia: mediaSchema,
    ctaLabel: z.string(),
    ctaHref: z.string().optional(),
    ctaMode: z.enum(["external", "internal", "coming-soon"]),
    disclosure: z.string().optional(),
    trustNotes: z.array(z.string()),
    relatedSlugs: z.array(z.string()),
    inputGuidance: z.array(z.string()),
    workflow: z.array(stepSchema),
    outcomeHighlights: z.array(z.string()),
    featuredBadges: z.array(z.string())
  })
});

const gallery = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    experienceSlug: z.string(),
    mediaType: z.enum(["image", "video"]),
    asset: z.string(),
    poster: z.string().optional(),
    alt: z.string(),
    caption: z.string(),
    collection: z.string(),
    isIllustrative: z.boolean(),
    order: z.number(),
    highlight: z.string().optional()
  })
});

export const collections = { experiences, gallery };
