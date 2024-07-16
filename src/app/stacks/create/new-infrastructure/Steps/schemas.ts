import { z } from "zod";

export const providerSchema = z.enum(["aws", "gcp"]);

export const providerFormSchema = z.object({
	provider: providerSchema
});

export type ProviderForm = z.infer<typeof providerFormSchema>;

export const configurationSchema = z.object({
	region: z.string().trim().min(1),
	stackName: z
		.string()
		.trim()
		.min(1, "Stack name is required")
		.max(32, "Stack name must be less than 32 characters")
		.regex(/^[a-zA-Z0-9-]+$/, "Stack name can only contain alphanumeric characters and hyphens")
});

export type ConfigurationForm = z.infer<typeof configurationSchema>;
