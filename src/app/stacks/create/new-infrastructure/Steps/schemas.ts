import { z } from "zod";

export const providerSchema = z.object({
	provider: z.enum(["aws", "gcp", "azure"])
});

export type ProviderForm = z.infer<typeof providerSchema>;

export const configurationSchema = z.object({
	region: z.string().trim().min(1),
	stackName: z.string().trim().min(1)
});

export type ConfigurationForm = z.infer<typeof configurationSchema>;
