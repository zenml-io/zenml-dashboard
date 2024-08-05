import { z } from "zod";

export const secretFormSchema = z.object({
	secretName: z.string().min(1, "Secret Name is required"),
	keysValues: z.array(
		z.object({
			key: z.string().min(1, "Key is required"),
			value: z.string().min(1, "Value is required"),
			showPassword: z.boolean().optional()
		})
	)
});

export type SecretFormType = z.infer<typeof secretFormSchema>;
