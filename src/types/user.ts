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
	infra_providers?: string[];
	primary_use?: string;
	overview_tour_done?: boolean;
	usage_reason?: string;
	comparing_tools?: string[];
	finished_onboarding_survey?: boolean;
};
