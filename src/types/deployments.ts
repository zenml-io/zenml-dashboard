// List

import { operations, components } from "./core";

export type DeploymentsList = components["schemas"]["Page_DeploymentResponse_"];
export type DeploymentsListQueryParams = NonNullable<
	operations["list_deployments_api_v1_deployments_get"]["parameters"]["query"]
>;

// Detail

export type Deployment = components["schemas"]["DeploymentResponse"];

// Common
export type DeploymentStatus = components["schemas"]["DeploymentStatus"];
