import { components } from "./core";

export type SecretNamespace = components["schemas"]["SecretResponse"];

export type CreateSecret = components["schemas"]["SecretRequest"];
export type Secret = components["schemas"]["SecretResponse"];
export type UpdateSecret = components["schemas"]["SecretUpdate"];
