import { createDataTableConsumerContext } from "@/components/tables/helper";
import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useDeleteApiKey } from "@/data/service-accounts/delete-api-key";

import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: ApiKeySelectorContext,
	ContextProvider: ApiKeySelectorContextProvider,
	useContext: useApiKeySelectorContext
} = createDataTableConsumerContext();

export function useApiKeyBulkDelete(serviceAccountId: string) {
	const { setRowSelection } = useApiKeySelectorContext();

	const { mutateAsync } = useDeleteApiKey();

	async function handleDelete(apiKeyId: string) {
		await mutateAsync({ serviceAccountId, apiKeyId });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: serviceAccountQueryKeys.serviceAccountsKey(),
		setRowSelection
	});
}
