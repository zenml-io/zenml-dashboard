import { components, operations } from "./core";

export type SecretNamespace = components["schemas"]["SecretResponse"];

export type CreateSecret = components["schemas"]["SecretRequest"];
export type Secret = components["schemas"]["SecretResponse"];
export type UpdateSecret = components["schemas"]["SecretUpdate"];
export type ListSecretsParams = NonNullable<
	operations["list_secrets_api_v1_secrets_get"]["parameters"]["query"]
>;
export type SecretsPage = components["schemas"]["Page_SecretResponse_"];
