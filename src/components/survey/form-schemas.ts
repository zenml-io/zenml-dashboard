import { z } from "zod";

export const accountDetailsFormSchema = z
	.object({
		fullName: z.string().optional(),
		email: z.string().email().optional(),
		getUpdates: z.boolean()
	})
	.refine((data) => {
		if (data.getUpdates) {
			return data.email !== "" && data.fullName !== "";
		}
		return true;
	});

export type AccountDetailForm = z.infer<typeof accountDetailsFormSchema>;

export const primaryUseFormSchema = z.object({
	primaryUse: z.string().min(1),
	amountProductionModels: z.string().min(1)
});

export type PrimaryUseFormType = z.infer<typeof primaryUseFormSchema>;

export const AwarenessFormSchema = z
	.object({
		channels: z.string().array().min(1),
		other: z.boolean(),
		otherVal: z.string().optional()
	})
	.refine((data) => {
		if (data.other) {
			return data.otherVal !== "";
		}
		return true;
	});

export type AwarenessFormType = z.infer<typeof AwarenessFormSchema>;

export const ServerNameFormSchema = z.object({
	serverName: z.string().optional()
});

export type ServerNameFormType = z.infer<typeof ServerNameFormSchema>;
