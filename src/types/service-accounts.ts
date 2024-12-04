import { components, operations } from "./core";

export type ListServiceAccountsParams = NonNullable<
	operations["list_service_accounts_api_v1_service_accounts_get"]["parameters"]["query"]
>;
export type ServiceAccountsList = components["schemas"]["Page_ServiceAccountResponse_"];
export type ServiceAccount = components["schemas"]["ServiceAccountResponse"];
export type CreateServiceAccount = components["schemas"]["ServiceAccountRequest"];
export type UpdateServiceAccount = components["schemas"]["ServiceAccountUpdate"];

export type ApiKey = components["schemas"]["APIKeyResponse"];
export type CreateApiKey = components["schemas"]["APIKeyRequest"];
export type UpdateApiKey = components["schemas"]["APIKeyUpdate"];
export type RotateApi = components["schemas"]["APIKeyRotateRequest"];
export type ApiKeyList = components["schemas"]["Page_APIKeyResponse_"];
