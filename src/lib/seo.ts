import { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

export function buildMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
