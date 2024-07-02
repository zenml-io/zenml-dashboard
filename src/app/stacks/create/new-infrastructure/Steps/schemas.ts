import { z } from "zod";

export const providerSchema = z.object({
	provider: z.enum(["aws", "gcp", "azure"])
});

export type ProviderForm = z.infer<typeof providerSchema>;
