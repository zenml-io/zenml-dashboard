import { components, operations } from "./core";

export type CodeRepository = components["schemas"]["CodeRepositoryResponse"];

export type PageCodeRepositoryResponse = components["schemas"]["Page_CodeRepositoryResponse_"];

export type CodeRepositoryListQueryParams = NonNullable<
	operations["list_code_repositories_api_v1_code_repositories_get"]["parameters"]["query"]
>;
