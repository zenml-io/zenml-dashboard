import { components, operations } from "./core";

export type Stack = components["schemas"]["StackResponse"];
export type StackComponentsList = {
	[key: string]: components["schemas"]["ComponentResponse"][];
};

export type StackList = components["schemas"]["Page_StackResponse_"];
export type StackListQueryParams = NonNullable<
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"]
>;

export type StackUpdateRequest = components["schemas"]["StackUpdate"];

// Stack deployments

export type StackDeploymentInfo = components["schemas"]["StackDeploymentInfo"];
export type StackDeploymentInfoQueryParams = NonNullable<
	operations["get_stack_deployment_info_api_v1_stack_deployment_info_get"]["parameters"]["query"]
>;
export type StackDeploymentConfigQueryParams = NonNullable<
	operations["get_stack_deployment_config_api_v1_stack_deployment_config_get"]["parameters"]["query"]
>;
export type StackDeploymentConfig = components["schemas"]["StackDeploymentConfig"];
export type StackDeploymentStackQueryParams = NonNullable<
	operations["get_deployed_stack_api_v1_stack_deployment_stack_get"]["parameters"]["query"]
>;
export type StackDeploymentStack = components["schemas"]["DeployedStack"];

export type StackDeploymentProvider = components["schemas"]["StackDeploymentProvider"];

export type StackRequest = components["schemas"]["StackRequest"];
