import { ListSecretsParams } from "@/types/secret";
import { queryOptions } from "@tanstack/react-query";
import { fetchAllSecrets } from "./secrets-all-query";
import { fetchSecretDetail } from "./get-secret-detail";

export const secretQueries = {
	all: ["secrets"],
	secretList: (queryParams: ListSecretsParams) =>
		queryOptions({
			queryKey: [...secretQueries.all, queryParams],
			queryFn: async () => fetchAllSecrets({ params: queryParams })
		}),
	secretDetail: (secretId: string) =>
		queryOptions({
			queryKey: [...secretQueries.all, secretId],
			queryFn: async () => fetchSecretDetail(secretId)
		})
};
