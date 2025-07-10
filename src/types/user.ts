import { components, operations } from "./core";

export type User = components["schemas"]["UserResponse"];
export type UserBody = components["schemas"]["UserResponseBody"];
export type UserPage = components["schemas"]["Page_UserResponse_"];

export type CreateUser = components["schemas"]["UserRequest"];

export type ListUserParams = NonNullable<
	operations["list_users_api_v1_users_get"]["parameters"]["query"]
>;

export type UpdateUser = components["schemas"]["UserUpdate"];

export type UserMetadata = {
	primary_role?: string;
	overview_tour_done?: boolean;
	ai_types_working_with?: string[];
	biggest_ai_challenges?: string[];
	finished_onboarding_survey?: boolean;
};
