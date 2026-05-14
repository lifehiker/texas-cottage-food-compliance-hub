import { labelDisclosureHelp } from "@/lib/content";
import { Card } from "@/components/ui/card";

export function LabelFieldHelp() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-brand-dark">Field-by-field reminders</h3>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
        {labelDisclosureHelp.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </Card>
  );
}
