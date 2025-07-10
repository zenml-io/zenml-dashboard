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

// Primary Role
export const primaryRoleFormSchema = z
	.object({
		primaryRole: z.string().min(1),
		otherVal: z.string().optional()
	})
	.refine((data) => {
		if (data.primaryRole === "other") {
			return data.otherVal !== "";
		}
		return true;
	});

export type PrimaryRoleFormType = z.infer<typeof primaryRoleFormSchema>;

// Types of AI
export const aiChallengesFormSchema = z
	.object({
		aiTypes: z
			.enum([
				"traditional_ml",
				"deep_learning",
				"computer_vision",
				"llm_and_foundation_models",
				"ai_agents_and_workflows",
				"hybrid_applications"
			])
			.array()
			.min(1),
		biggestChallenge: z.string().array().optional()
	})
	.refine((data) => {
		const hasLlmOrAgents = data.aiTypes.some(
			(type) => type === "llm_and_foundation_models" || type === "ai_agents_and_workflows"
		);
		if (hasLlmOrAgents) {
			return data.biggestChallenge?.length ?? 0 > 0;
		}
		return true;
	});

export type AiChallengesFormType = z.infer<typeof aiChallengesFormSchema>;

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
