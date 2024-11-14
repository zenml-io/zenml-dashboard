import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useUpdateApiKey } from "@/data/service-accounts/update-api-key";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateServiceAccount } from "@/types/service-accounts";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, useToast } from "@zenml-io/react-component-library";

interface ToggleActiveServiceAccountProps {
	isActive: boolean;
	serviceAccountId: string;
	apiKeyId: string;
}

export default function ToggleActiveApiKey({
	isActive,
	serviceAccountId,
	apiKeyId
}: ToggleActiveServiceAccountProps) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate } = useUpdateApiKey({
		onError(error) {
			if (isFetchError(error)) {
				// Rollback state if there is an error
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: serviceAccountQueryKeys.apiKeysKey(serviceAccountId)
			});
		}
	});

	function updateServiceAccount(newActiveStatus: boolean) {
		const updateApiData: UpdateServiceAccount = {
			active: newActiveStatus
		};
		mutate({
			serviceAccountId: serviceAccountId,
			apiKeyId: apiKeyId,
			body: updateApiData
		});
	}

	return (
		<Switch
			checked={isActive}
			onCheckedChange={(checked) => {
				updateServiceAccount(checked);
			}}
		/>
	);
}
