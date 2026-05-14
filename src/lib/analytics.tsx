"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag?.("event", name, properties);
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(name, properties);
  }
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
      });
    }
  }, []);

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== "undefined") {
      window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }

    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
