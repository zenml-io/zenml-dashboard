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
	primaryUse: z.string().min(1)
});

export type PrimaryUseFormType = z.infer<typeof primaryUseFormSchema>;

export const AwarenessFormSchema = z
	.object({
		channels: z.string().array(),
		other: z.boolean(),
		otherVal: z.string().optional()
	})
	.refine((data) => {
		if (data.other) {
			return data.otherVal !== "";
		}
		return data.channels.length > 0;
	});

export type AwarenessFormType = z.infer<typeof AwarenessFormSchema>;

export const ServerNameFormSchema = z.object({
	serverName: z.string().optional()
});

export type ServerNameFormType = z.infer<typeof ServerNameFormSchema>;

export function getSetPasswordStepSchema(withUsername: boolean = false) {
	return updatePasswordBaseFormSchema
		.extend({
			username: z.string()
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			path: ["confirmPassword"],
			message: "Passwords do not match"
		})
		.refine((data) => {
			if (withUsername) {
				return data.username.length > 0;
			}
			return true;
		});
}

const setPasswordStepSchema = getSetPasswordStepSchema();
export type SetPasswordStepType = z.infer<typeof setPasswordStepSchema>;
