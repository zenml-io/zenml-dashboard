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

export const ReasonFormSchema = z
	.object({
		reasons: z.string().array().min(1),
		other: z.boolean(),
		otherVal: z.string().optional()
	})
	.refine((data) => {
		if (data.other) {
			return data.otherVal !== "";
		}
		return true;
	});

export type ReasonFormType = z.infer<typeof ReasonFormSchema>;

export const ServerNameFormSchema = z.object({
	serverName: z.string().optional()
});

export type ServerNameFormType = z.infer<typeof ServerNameFormSchema>;
