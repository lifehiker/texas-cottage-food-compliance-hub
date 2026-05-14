import { MetadataRoute } from "next";

import { blogPosts, seoPages, templates } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/pricing",
    ...seoPages,
    ...templates.map((template) => `/templates/${template.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    "/dashboard",
  ].map((path) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
