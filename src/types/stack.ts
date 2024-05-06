import { components } from "./core";

export type Stack = components["schemas"]["StackResponse"];
export type StackComponentsList = {
	[key: string]: components["schemas"]["ComponentResponse"][];
};
