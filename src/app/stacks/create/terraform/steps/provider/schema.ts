import { z } from "zod";
import { providerSchema } from "../../../new-infrastructure/Steps/schemas";

export const providerFormSchema = z.object({
	provider: providerSchema
});

export type ProviderForm = z.infer<typeof providerFormSchema>;
