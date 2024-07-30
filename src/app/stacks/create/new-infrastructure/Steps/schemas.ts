import { z } from "zod";
import { stackNameSchema } from "../../components/sharedSchema";

export const providerSchema = z.enum(["aws", "gcp", "azure"]);

export const providerFormSchema = z.object({
	provider: providerSchema
});

export type ProviderForm = z.infer<typeof providerFormSchema>;

export const configurationSchema = z.object({
	region: z.string().trim().min(1),
	stackName: stackNameSchema
});

export type ConfigurationForm = z.infer<typeof configurationSchema>;
