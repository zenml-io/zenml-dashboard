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

export const userMetadataSchema = z
	.object({
		primary_role: z.string().optional().catch(""),
		overview_tour_done: z.boolean().optional().catch(undefined),
		ai_types_working_with: z.array(z.string()).optional().catch([]),
		biggest_ai_challenges: z.array(z.string()).optional().catch([]),
		finished_onboarding_survey: z.boolean().optional().catch(undefined),
		infra_type: z.string().optional().catch(""),
		awareness_channels: z.array(z.string()).optional().catch([])
	})
	.passthrough();

export type UserMetadata = z.infer<typeof userMetadataSchema>;
