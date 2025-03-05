import { useApiKeyDataTableContext } from "./ApiKeyDataTableContext";
import { createUseBulkDelete } from "@/lib/bulk-delete";
import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useDeleteApiKey } from "@/data/service-accounts/delete-api-key";

export const useBulkDeleteApiKeys = createUseBulkDelete({
	useMutation: useDeleteApiKey,
	useQueryKeys: () => ({
		all: (serviceAccountId: string) => serviceAccountQueryKeys.apiKeysKey(serviceAccountId)
	}),
	useDataTableContext: useApiKeyDataTableContext,
	getParams: (serviceAccountId, apiKeyId) => ({ serviceAccountId, apiKeyId })
});
