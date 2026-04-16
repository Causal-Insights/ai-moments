import { getCollection } from "astro:content";
import { siteConfig } from "../config/site.js";

function compareExperiences(a, b) {
  const statusOrder = { live: 0, "coming-soon": 1 };
  return (
    statusOrder[a.data.status] - statusOrder[b.data.status] ||
    a.data.title.localeCompare(b.data.title)
  );
}

function resolveExperience(entry) {
  const slug = entry.slug;
  const ctaHref = entry.data.ctaHref ?? siteConfig.experienceDestinations[slug] ?? "/experiences/";

  return {
    ...entry,
    slug,
    url: entry.data.status === "live" ? `/experiences/${slug}/` : null,
    data: {
      slug,
      ...entry.data,
      ctaHref
    }
  };
}

export async function getExperiences() {
  const experiences = await getCollection("experiences");
  return experiences.map(resolveExperience).sort(compareExperiences);
}

export async function getLiveExperiences() {
  const experiences = await getExperiences();
  return experiences.filter((entry) => entry.data.status === "live");
}

export async function getComingSoonExperiences() {
  const experiences = await getExperiences();
  return experiences.filter((entry) => entry.data.status === "coming-soon");
}

export async function getExperienceBySlug(slug) {
  const experiences = await getExperiences();
  return experiences.find((entry) => entry.data.slug === slug);
}

export async function getGalleryItems() {
  const items = await getCollection("gallery");
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getGalleryForExperience(slug) {
  const items = await getGalleryItems();
  return items.filter((item) => item.data.experienceSlug === slug);
}
