import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useDeleteServiceAccount } from "@/data/service-accounts/delete-service-account";
import { isFetchError } from "@/lib/fetch-error";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { SetStateAction, createContext, useContext, useState } from "react";

type ServiceAccountSelectorContextProps = {
	selectedServiceAccounts: string[];
	setSelectedServiceAccounts: (actions: SetStateAction<string[]>) => void;
	bulkDeleteServiceAccounts: (accountIDs: string[]) => Promise<void>;
};

const ServiceAccountsSelectorContext = createContext<ServiceAccountSelectorContextProps | null>(
	null
);

export function ServiceAccountsSelectorProvider({ children }: { children: React.ReactNode }) {
	const [selectedServiceAccounts, setSelectedServiceAccounts] = useState<string[]>([]);
	const queryClient = useQueryClient();

	const { toast } = useToast();

	const deleteServiceAccountMutation = useDeleteServiceAccount();

	const bulkDeleteServiceAccounts = async (accountIds: string[]) => {
		try {
			// Use mutateAsync to handle each delete operation
			const deletePromises = accountIds.map((id) => deleteServiceAccountMutation.mutateAsync(id));

			await Promise.all(deletePromises);
			toast({
				description: "Deleted successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			queryClient.invalidateQueries({
				queryKey: serviceAccountQueryKeys.serviceAccountsKey()
			});
			setSelectedServiceAccounts([]);
		} catch (e) {
			if (isFetchError(e)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: e.message,
					rounded: true
				});
			}

			console.error("Failed to delete some pipelines:", e);
		}
	};

	return (
		<ServiceAccountsSelectorContext.Provider
			value={{
				selectedServiceAccounts,
				setSelectedServiceAccounts,
				bulkDeleteServiceAccounts
			}}
		>
			{children}
		</ServiceAccountsSelectorContext.Provider>
	);
}

export function useServiceAccountSelectorContext() {
	const context = useContext(ServiceAccountsSelectorContext);
	if (!context)
		throw new Error(
			"useServiceAccountSelectorContext must be used within a ServiceAccountsSelectorProvider"
		);
	return context;
}
