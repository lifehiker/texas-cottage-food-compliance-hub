"use client";

import { useMemo, useState } from "react";

import { eligibilityCatalog, disclaimer } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const channelOptions = [
  { value: "market", label: "Farmers market or pop-up" },
  { value: "pickup", label: "Direct pickup" },
  { value: "delivery", label: "Personal delivery" },
  { value: "online", label: "Online order with direct delivery" },
];

const productOptions = eligibilityCatalog.map((item) => ({
  value: item.slug,
  label: item.name,
}));

const statusStyles: Record<string, string> = {
  "likely allowed": "bg-[#e7f4e4] text-[#2d5a2a]",
  "needs review": "bg-[#fff1d6] text-[#7a4d08]",
  "not supported by app guidance": "bg-[#ffe5df] text-[#8a2f1f]",
};

export function EligibilityChecker() {
  const [product, setProduct] = useState("cookies");
  const [channel, setChannel] = useState("market");

  const result = useMemo(() => {
    const selected = eligibilityCatalog.find((item) => item.slug === product) || eligibilityCatalog[0];

    const channelNote =
      channel === "online"
        ? "For online orders, the consumer must buy directly from you, see label details before payment, and receive personal delivery from you, your employee, or a household member."
        : channel === "delivery"
          ? "Personal delivery stays inside the direct-sale workflow when you control the handoff to the consumer."
          : channel === "pickup"
            ? "Pickup usually fits the direct-sale model when the buyer is purchasing directly from your operation."
            : "Market sales usually work best when labels, disclosure signage, and backup ingredient notes are already prepared.";

    return {
      ...selected,
      channelNote,
    };
  }, [channel, product]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark">Guided first-pass checker</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Pick a product and sales channel to get a likely allowed, review, or unsupported starting point before you print labels or prep inventory.
            </p>
          </div>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Product category</span>
            <select
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground outline-none"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
            >
              {productOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Planned sales channel</span>
            <select
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground outline-none"
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
            >
              {channelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <Button asChild variant="outline">
            <a href="/texas-cottage-food-label-generator">Continue into label generator</a>
          </Button>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
            Checker result
          </p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[result.status]}`}>
            {result.status}
          </span>
        </div>
        <h3 className="mt-4 text-3xl font-semibold text-foreground">{result.name}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{result.summary}</p>
        <div className="mt-5 rounded-2xl bg-[#fff8ef] p-4 text-sm leading-7 text-foreground">
          <strong className="block text-brand-dark">Channel guidance</strong>
          <p className="mt-1">{result.channel}</p>
          <p className="mt-3">{result.channelNote}</p>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted">{disclaimer}</p>
      </Card>
    </div>
  );
}
