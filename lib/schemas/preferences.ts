import * as z from "zod";

export const preferencesSchema = z.object({
  githubUsername: z
    .string()
    .min(1, "Nazwa użytkownika jest wymagana")
    .max(39, "Nazwa użytkownika GitHub jest za długa")
    .regex(
      /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      "Niepoprawny format nazwy GitHub",
    )
    .nullable()
    .or(z.literal("")),
  emailNews: z.boolean().default(true),
  emailDigest: z.boolean().default(false),
});

export type PreferencesValues = z.infer<typeof preferencesSchema>;
