import { z } from "zod";
import { updatePasswordBaseFormSchema } from "../password/UpdatePasswordSchemas";

export const accountDetailsFormSchema = z
	.object({
		fullName: z.union([z.string(), z.literal("")]),
		email: z.union([z.string().email(), z.literal("")]),
		getUpdates: z.boolean()
	})
	.refine((data) => {
		if (data.getUpdates) {
			return data.email !== "";
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

export const setPasswordStepSchema = updatePasswordBaseFormSchema
	.extend({
		username: z.string().min(1)
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match"
	});

export type SetPasswordStepType = z.infer<typeof setPasswordStepSchema>;
