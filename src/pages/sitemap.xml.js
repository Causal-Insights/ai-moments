import { getLiveExperiences } from "../lib/content.js";
import { siteConfig } from "../config/site.js";

export async function GET() {
  const liveExperiences = await getLiveExperiences();
  const staticRoutes = [
    "/",
    "/experiences/",
    "/gallery/",
    "/studio/",
    "/pricing/",
    "/sign-in/",
    "/about/",
    "/privacy/",
    "/terms/"
  ];

  const urls = [
    ...staticRoutes,
    ...liveExperiences.map((entry) => `/experiences/${entry.data.slug}/`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${new URL(path, siteConfig.siteUrl).toString()}</loc>
    <changefreq>${path === "/" || path.startsWith("/experiences/") ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.startsWith("/experiences/") ? "0.9" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
