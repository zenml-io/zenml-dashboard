import { z } from "zod";

export const providerSchema = z.object({
	provider: z.string().min(1)
});

export type ProviderForm = z.infer<typeof providerSchema>;
