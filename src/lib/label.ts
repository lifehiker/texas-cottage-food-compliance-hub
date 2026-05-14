import { z } from "zod";

import { siteConfig } from "@/lib/site";

export const labelSchema = z
  .object({
    title: z.string().min(2, "Add a name for this saved label."),
    businessName: z.string().min(2, "Enter the business or operation name."),
    productName: z.string().min(2, "Enter the common product name."),
    ingredients: z.string().min(5, "List the ingredients in descending order."),
    allergenStatement: z.string().optional(),
    netQuantity: z.string().min(2, "Add the net quantity."),
    contactCity: z.string().min(2, "Enter the city."),
    contactState: z.string().length(2, "Use the two-letter state abbreviation."),
    contactZip: z.string().min(5, "Enter the ZIP code."),
    addressLine: z.string().optional(),
    registrationNumber: z.string().optional(),
    requiredDisclosure: z.string().min(10),
    batchCode: z.string().optional(),
    madeOnDate: z.string().optional(),
    isTcsFood: z.boolean(),
    safeHandling: z.boolean(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.registrationNumber && !data.addressLine) {
      ctx.addIssue({
        code: "custom",
        message: "Add either the home address line or the DSHS registration number.",
        path: ["addressLine"],
      });
    }

    if (data.requiredDisclosure !== siteConfig.disclosure) {
      ctx.addIssue({
        code: "custom",
        message: "The required Texas disclosure must remain unchanged.",
        path: ["requiredDisclosure"],
      });
    }

    if (data.isTcsFood && !data.madeOnDate) {
      ctx.addIssue({
        code: "custom",
        message: "TCS foods need a date-made field.",
        path: ["madeOnDate"],
      });
    }
  });

export type LabelFormValues = z.infer<typeof labelSchema>;
