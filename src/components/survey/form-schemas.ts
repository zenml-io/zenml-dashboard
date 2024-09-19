import { z } from "zod";
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

// Primary Use
export const primaryUseFormSchema = z.object({
	primaryUse: z.string().min(1)
});

export type PrimaryUseFormType = z.infer<typeof primaryUseFormSchema>;

// Infrastructure
export const InfrastructureFormSchema = z
	.object({
		providers: z.string().array(),
		other: z.boolean(),
		otherVal: z.string().optional()
	})
	.refine((data) => {
		if (data.other) {
			return data.otherVal !== "";
		}
		return data.providers.length > 0;
	});

export type InfrastructureFormType = z.infer<typeof InfrastructureFormSchema>;

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

const setPasswordStepSchema = getSetPasswordStepSchema();
export type SetPasswordStepType = z.infer<typeof setPasswordStepSchema>;

// Usage Reason

export const UsageReasonFormSchema = z
	.object({
		usageReason: z.union([
			z.enum([
				"exploring",
				"planning_poc",
				"comparing_tools",
				"implementing_production_environment"
			]),
			z.literal("")
		]),
		comparison_tools: z.string().array().optional(),
		otherTool: z.boolean().optional(),
		otherToolVal: z.string().optional()
	})
	.refine((data) => {
		if (data.usageReason.length === 0) return false;
		if (data.otherTool) return data.otherToolVal !== "";
		if (data.usageReason === "comparing_tools") return data.comparison_tools?.length ?? 0 > 0;

		return true;
	});
export type UsageReasonFormType = z.infer<typeof UsageReasonFormSchema>;
