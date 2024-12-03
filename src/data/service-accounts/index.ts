import { queryOptions } from "@tanstack/react-query";
import { fetchAllServiceAccounts } from "./list-service-accounts";
import { ListServiceAccountsParams } from "../../types/service-accounts";
import { fetchServiceAccountDetail } from "./get-service-account";
import { fetchServiceAccountApiKeys } from "./list-api-keys";
import { fetchApiKeyDetail } from "./get-api-key";

export const serviceAccountQueries = {
	serviceAccountList: (queryParams: ListServiceAccountsParams) =>
		queryOptions({
			queryKey: [...serviceAccountQueryKeys.serviceAccountsKey(), queryParams],
			queryFn: async () => fetchAllServiceAccounts({ params: queryParams })
		}),
	serviceAccountDetail: (serviceAccountId: string) =>
		queryOptions({
			queryKey: [...serviceAccountQueryKeys.serviceAccountsKey(), serviceAccountId],
			queryFn: async () => fetchServiceAccountDetail({ serviceAccountId })
		}),
	serviceAccountApiKeys: (serviceAccountId: string, queryParams: ListServiceAccountsParams) =>
		queryOptions({
			queryKey: [...serviceAccountQueryKeys.apiKeysKey(serviceAccountId), queryParams],
			queryFn: async () =>
				fetchServiceAccountApiKeys({
					serviceAccountId,
					params: queryParams
				})
		}),
	ApiKeysDetail: (serviceAccountId: string, apiKeyId: string) =>
		queryOptions({
			queryKey: [...serviceAccountQueryKeys.apiKeysKey(serviceAccountId), apiKeyId],
			queryFn: async () => fetchApiKeyDetail({ serviceAccountId, apiKeyId })
		})
};

export const serviceAccountQueryKeys = {
	serviceAccountsKey: () => ["service_accounts"],
	apiKeysKey: (accountId: string) => [
		...serviceAccountQueryKeys.serviceAccountsKey(),
		accountId,
		"api_keys"
	]
};
