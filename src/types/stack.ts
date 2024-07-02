import { components, operations } from "./core";

export type Stack = components["schemas"]["StackResponse"];
export type StackComponentsList = {
	[key: string]: components["schemas"]["ComponentResponse"][];
};

export type StackList = components["schemas"]["Page_StackResponse_"];
export type StackListQueryParams = NonNullable<
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"]
>;
