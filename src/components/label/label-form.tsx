"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Printer, Save } from "lucide-react";

import { buildLabelPdfBlob } from "@/lib/pdf";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { labelSchema, LabelFormValues } from "@/lib/label";
import { saveLabel } from "@/lib/actions";
import { siteConfig } from "@/lib/site";
import { LabelPreview } from "@/components/label/label-preview";
import { LabelFieldHelp } from "@/components/label/label-field-help";

const defaultValues: LabelFormValues = {
  title: "Weekend Market Label",
  businessName: "Bluebonnet Bake Table",
  productName: "Chocolate Chip Cookies",
  ingredients:
    "Flour, butter, brown sugar, sugar, eggs, chocolate chips, vanilla, baking soda, salt",
  allergenStatement: "Contains: Wheat, Milk, Egg, Soy",
  netQuantity: "Net Wt. 12 oz (340 g)",
  contactCity: "Austin",
  contactState: "TX",
  contactZip: "78704",
  addressLine: "123 Market Lane",
  registrationNumber: "",
  requiredDisclosure: siteConfig.disclosure,
  batchCode: "",
  madeOnDate: "",
  isTcsFood: false,
  safeHandling: false,
  notes: "Starter template for market cookies.",
};

export function LabelForm({ prefill }: { prefill?: Partial<LabelFormValues> }) {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const hasTrackedStart = useRef(false);
  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelSchema),
    defaultValues: { ...defaultValues, ...prefill },
  });

  const values = form.watch();
  const previewValues = useMemo(() => values, [values]);

  async function onSave(valuesToSave: LabelFormValues) {
    startTransition(async () => {
      trackEvent("label_saved_attempted", { is_tcs_food: valuesToSave.isTcsFood });
      const result = await saveLabel(valuesToSave);
      trackEvent(result.ok ? "label_saved" : "label_save_blocked", {
        is_tcs_food: valuesToSave.isTcsFood,
      });
      setStatus(result.message);
    });
  }

  async function exportPdf() {
    trackEvent("export_clicked", { format: "pdf" });
    const valid = await form.trigger();

    if (!valid) {
      setStatus("Fix the required fields before exporting.");
      return;
    }

    const blob = await buildLabelPdfBlob({
      ...form.getValues(),
      safeHandlingText: siteConfig.safeHandling,
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${values.title || "texas-label"}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleChange() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("label_started");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="p-6 sm:p-8">
        <form
          className="space-y-5"
          onSubmit={form.handleSubmit(onSave)}
          onChange={handleChange}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Saved label name</span>
              <Input {...form.register("title")} />
              <p className="text-xs text-red-700">{form.formState.errors.title?.message}</p>
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Operation name</span>
              <Input {...form.register("businessName")} />
              <p className="text-xs text-red-700">{form.formState.errors.businessName?.message}</p>
            </label>
          </div>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Product name</span>
            <Input {...form.register("productName")} />
            <p className="text-xs text-red-700">{form.formState.errors.productName?.message}</p>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Ingredients</span>
            <Textarea {...form.register("ingredients")} />
            <p className="text-xs text-red-700">{form.formState.errors.ingredients?.message}</p>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Allergen statement</span>
              <Input {...form.register("allergenStatement")} />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Net quantity</span>
              <Input {...form.register("netQuantity")} />
              <p className="text-xs text-red-700">{form.formState.errors.netQuantity?.message}</p>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Address line</span>
              <Input {...form.register("addressLine")} />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">City</span>
              <Input {...form.register("contactCity")} />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">State / ZIP</span>
              <div className="grid grid-cols-[88px_1fr] gap-2">
                <Input maxLength={2} {...form.register("contactState")} />
                <Input {...form.register("contactZip")} />
              </div>
            </label>
          </div>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">DSHS registration number</span>
            <Input {...form.register("registrationNumber")} placeholder="Optional replacement for your home address" />
            <p className="text-xs text-red-700">{form.formState.errors.addressLine?.message}</p>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Batch code</span>
              <Input {...form.register("batchCode")} />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-foreground">Date made</span>
              <Input type="date" {...form.register("madeOnDate")} />
              <p className="text-xs text-red-700">{form.formState.errors.madeOnDate?.message}</p>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4 text-sm">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--brand)]" {...form.register("isTcsFood")} />
              <span>
                <strong className="block text-foreground">This is a TCS food</strong>
                Use this only if the item needs time/temperature control under current Texas guidance.
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4 text-sm">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--brand)]" {...form.register("safeHandling")} />
              <span>
                <strong className="block text-foreground">Include safe-handling statement</strong>
                Required when the TCS workflow applies.
              </span>
            </label>
          </div>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Required disclosure</span>
            <Textarea readOnly {...form.register("requiredDisclosure")} />
          </label>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={pending}>
              <Save className="mr-2 h-4 w-4" />
              {pending ? "Saving..." : "Save label"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print label
            </Button>
            <Button type="button" variant="outline" onClick={exportPdf}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
        </form>
      </Card>
      <div className="space-y-6">
        <LabelPreview values={previewValues} />
        <LabelFieldHelp />
      </div>
    </div>
  );
}
