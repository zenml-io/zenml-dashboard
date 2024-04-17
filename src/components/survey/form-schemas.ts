import { z } from "zod";

export const accountDetailsFormSchema = z.object({
	username: z.string().optional(),
	fullName: z.string().min(1),
	workEmail: z.string().email(),
	getUpdates: z.boolean()
});

export type AccountDetailForm = z.infer<typeof accountDetailsFormSchema>;

export const primaryUseFormSchema = z.object({
	primaryUse: z.string().min(1),
	amountProductionModels: z.string().min(1)
});

export type PrimaryUseForm = z.infer<typeof primaryUseFormSchema>;
