import { SITE_URL } from "@/lib/site";
import { allServiceSlugs } from "@/lib/services";

export default function sitemap() {
  const now = new Date();
  const routes = ["", "/kontak", ...allServiceSlugs().map((s) => `/${s}`)];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
