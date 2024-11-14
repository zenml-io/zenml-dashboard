import { z } from "zod";

export const serviceAccountFormSchema = z.object({
	name: z.string().min(1, "Service Account Name is required"),
	description: z.string()
});

export type ServiceAccountFormType = z.infer<typeof serviceAccountFormSchema>;

export const createServiceAccountFormSchema = serviceAccountFormSchema.extend({
	createDefault: z.boolean()
});

export type CreateServiceAccountForm = z.infer<typeof createServiceAccountFormSchema>;
