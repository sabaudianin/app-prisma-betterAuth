import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "TItle is required")
    .max(200, "Title too long(max 200 characters"),
  content: z.string().min(1, "COntent is required"),
  category: z
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
  //zmian pustego "" na null
  tags: z.string().optional().default(""),
});

//typ na podstawie tematu
export type NoteSchemaType = z.infer<typeof noteSchema>;
