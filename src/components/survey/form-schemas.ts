import { z } from "zod";
import { INFRA_TYPE_OPTIONS, PRIMARY_ROLE_OPTIONS } from "@/types/user";
import { updatePasswordBaseFormSchema } from "../password/UpdatePasswordSchemas";

// Account Details
export const accountDetailsFormSchema = z
	.object({
		fullName: z.string().min(1),
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

// Server Name
export const ServerNameFormSchema = z.object({
	serverName: z.string().optional()
});

export type ServerNameFormType = z.infer<typeof ServerNameFormSchema>;

// Server Password
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

export type SetPasswordStepType = z.infer<ReturnType<typeof getSetPasswordStepSchema>>;

// About you

export const aboutYouFormSchema = z.object({
	primaryRole: z.enum(PRIMARY_ROLE_OPTIONS).optional(),
	infraType: z.enum(INFRA_TYPE_OPTIONS).optional()
});

export type AboutYouFormType = z.infer<typeof aboutYouFormSchema>;
