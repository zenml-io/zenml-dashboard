import { createUseBulkDelete } from "@/lib/bulk-delete";
import { useDeleteServiceAccount } from "../../../data/service-accounts/delete-service-account";
import { serviceAccountQueryKeys } from "../../../data/service-accounts";
import { useServiceAccountDataTableContext } from "./ServiceAccountDataTableContext";

export const useBulkDeleteServiceAccounts = createUseBulkDelete({
	useMutation: useDeleteServiceAccount,
	useQueryKeys: () => ({
		all: serviceAccountQueryKeys.serviceAccountsKey
	}),
	getParams: (serviceAccountId: string) => serviceAccountId,
	useDataTableContext: useServiceAccountDataTableContext
});
