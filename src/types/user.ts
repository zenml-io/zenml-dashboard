import { z } from "zod";
import { components, operations } from "./core";

export type User = components["schemas"]["UserResponse"];
export type UserBody = components["schemas"]["UserResponseBody"];
export type UserPage = components["schemas"]["Page_UserResponse_"];

export type CreateUser = components["schemas"]["UserRequest"];

export type ListUserParams = NonNullable<
	operations["list_users_api_v1_users_get"]["parameters"]["query"]
>;

export type UpdateUser = components["schemas"]["UserUpdate"];

export const PRIMARY_ROLE_OPTIONS = [
	"ml_engineer",
	"platform_engineer",
	"ai_engineer",
	"engineering_lead",
	"student",
	"other"
] as const;

export const INFRA_TYPE_OPTIONS = ["local", "kubernetes", "cloud", "not_sure_yet"] as const;

export const userMetadataSchema = z
	.object({
		primary_role: z.enum(PRIMARY_ROLE_OPTIONS).optional().catch("ml_engineer"),
		overview_tour_done: z.boolean().optional().catch(undefined),
		ai_types_working_with: z.array(z.string()).optional().catch([]),
		biggest_ai_challenges: z.array(z.string()).optional().catch([]),
		finished_onboarding_survey: z.boolean().optional().catch(undefined),
		infra_type: z.enum(INFRA_TYPE_OPTIONS).optional().catch("local"),
		awareness_channels: z.array(z.string()).optional().catch([])
	})
	.passthrough();

export type UserMetadata = z.infer<typeof userMetadataSchema>;
