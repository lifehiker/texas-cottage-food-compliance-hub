import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { LabelFormValues } from "@/lib/label";

export function LabelPreview({ values }: { values: LabelFormValues }) {
  return (
    <Card className="print-card print-shell rounded-[26px] p-6">
      <div className="space-y-4 text-sm leading-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">
            Live label preview
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{values.productName}</h3>
          <p className="text-muted">{values.businessName}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Ingredients</p>
          <p>{values.ingredients}</p>
        </div>
        {values.allergenStatement ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Allergens</p>
            <p>{values.allergenStatement}</p>
          </div>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Net Quantity</p>
            <p>{values.netQuantity}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Address or Registration</p>
            <p>
              {values.registrationNumber ||
                [values.addressLine, values.contactCity, `${values.contactState} ${values.contactZip}`]
                  .filter(Boolean)
                  .join(", ")}
            </p>
          </div>
        </div>
        {values.batchCode ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Batch code</p>
            <p>{values.batchCode}</p>
          </div>
        ) : null}
        {values.madeOnDate ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Date made</p>
            <p>{values.madeOnDate}</p>
          </div>
        ) : null}
        <div className="rounded-2xl border border-dashed border-border bg-[#fff8ef] p-4 text-sm font-semibold">
          {siteConfig.disclosure}
        </div>
        {values.safeHandling ? (
          <div className="rounded-2xl border border-brand/20 bg-[#fff5eb] p-4 text-sm">
            {siteConfig.safeHandling}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
