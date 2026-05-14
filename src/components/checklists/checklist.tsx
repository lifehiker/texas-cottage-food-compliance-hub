"use client";

import { useState, useTransition } from "react";

import { saveChecklistProgress } from "@/lib/actions";
import { trackEvent } from "@/lib/analytics";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Checklist({
  type,
  title,
  description,
  items,
  initialCompleted = [],
}: {
  type: "launch" | "market";
  title: string;
  description: string;
  items: string[];
  initialCompleted?: string[];
}) {
  const [completed, setCompleted] = useState<string[]>(initialCompleted);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(item: string) {
    trackEvent("checklist_item_toggled", { checklist_type: type });
    setCompleted((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  }

  function onSave() {
    startTransition(async () => {
      trackEvent("checklist_save_attempted", { checklist_type: type });
      const result = await saveChecklistProgress(type, completed);
      trackEvent(result.ok ? "checklist_saved" : "checklist_save_blocked", {
        checklist_type: type,
      });
      setStatus(result.message);
    });
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
        </div>
        <div className="space-y-4">
          {items.map((item) => {
            const checked = completed.includes(item);
            return (
              <label
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-border bg-white/85 p-4"
              >
                <Checkbox checked={checked} onCheckedChange={() => toggle(item)} />
                <span className="text-sm leading-7 text-foreground">{item}</span>
              </label>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onSave} disabled={pending}>
            {pending ? "Saving..." : "Save progress"}
          </Button>
          <p className="text-sm text-muted">
            {completed.length} of {items.length} complete
          </p>
        </div>
        {status ? <p className="text-sm text-muted">{status}</p> : null}
      </div>
    </Card>
  );
}
