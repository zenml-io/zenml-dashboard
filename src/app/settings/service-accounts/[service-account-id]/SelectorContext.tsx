import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useDeleteApiKey } from "@/data/service-accounts/delete-api-key";
import { isFetchError } from "@/lib/fetch-error";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library/components/client";
import { SetStateAction, createContext, useContext, useState } from "react";

type ApiKeysSelectorContextProps = {
	selectedApiKeys: string[];
	setSelectedApiKeys: (actions: SetStateAction<string[]>) => void;
	bulkDeleteApiKeys: (apiKeys: string[], serviceAccountId: string) => Promise<void>;
};

const ApiKeysSelectorContext = createContext<ApiKeysSelectorContextProps | null>(null);

export function ApiKeysSelectorProvider({ children }: { children: React.ReactNode }) {
	const [selectedApiKeys, setSelectedApiKeys] = useState<string[]>([]);

	const queryClient = useQueryClient();

	const { toast } = useToast();

	const deleteApiKeyMutation = useDeleteApiKey();

	const bulkDeleteApiKeys = async (apiKeys: string[], serviceAccountId: string) => {
		try {
			// Use mutateAsync to handle each delete operation
			const deletePromises = apiKeys.map((id) =>
				deleteApiKeyMutation.mutateAsync({
					apiKeyId: id,
					serviceAccountId: serviceAccountId
				})
			);

			await Promise.all(deletePromises);
			toast({
				description: "Deleted successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			await queryClient.invalidateQueries({
				queryKey: serviceAccountQueryKeys.apiKeysKey(serviceAccountId)
			});
			setSelectedApiKeys([]);
		} catch (e) {
			if (isFetchError(e)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: e.message,
					rounded: true
				});
			}
		}
	};

	return (
		<ApiKeysSelectorContext.Provider
			value={{
				selectedApiKeys,
				setSelectedApiKeys,
				bulkDeleteApiKeys
			}}
		>
			{children}
		</ApiKeysSelectorContext.Provider>
	);
}

export function useApiKeySelectorContext() {
	const context = useContext(ApiKeysSelectorContext);
	if (!context)
		throw new Error(
			"useServiceAccountSelectorContext must be used within a ServiceAccountsSelectorProvider"
		);
	return context;
}
