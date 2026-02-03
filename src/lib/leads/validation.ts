import { z } from "zod";

export const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional().refine(
    (val) => !val || /^[\d\s\-+()]+$/.test(val),
    "Invalid phone number"
  ),
  company: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "new" | "contacted" | "converted";
};

export type LeadInput = z.infer<typeof leadSchema>;
