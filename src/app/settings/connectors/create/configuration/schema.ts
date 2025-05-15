import { z } from "zod";

export const connectorConfigurationSchema = z.object({
	description: z.string().trim(),
	authMethod: z.string().trim().min(1, "Auth method is required"),
	resourceType: z.string().trim().min(1, "Resource type is required"),
	isValid: z.boolean().nullable(),
	skipValidation: z.boolean()
});

// define a zod schema for this ts type {name: string; skipValidation:boolean; [key: string]: unknown}

export type ConnectorConfigForm = z.infer<typeof connectorConfigurationSchema> & {
	name: string;
	[key: string]: unknown;
};
