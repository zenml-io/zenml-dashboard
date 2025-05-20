import { createDataTableConsumerContext } from "@/components/tables/helper";
import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useDeleteServiceAccount } from "@/data/service-accounts/delete-service-account";

import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: ServiceAccountSelectorContext,
	ContextProvider: ServiceAccountSelectorContextProvider,
	useContext: useServiceAccountSelectorContext
} = createDataTableConsumerContext();

export function useServiceAccountBulkDelete() {
	const { setRowSelection } = useServiceAccountSelectorContext();

	const { mutateAsync } = useDeleteServiceAccount();

	async function handleDelete(id: string) {
		await mutateAsync(id);
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: serviceAccountQueryKeys.serviceAccountsKey(),
		setRowSelection
	});
}
