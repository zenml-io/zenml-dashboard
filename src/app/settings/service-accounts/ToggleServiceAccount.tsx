import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useUpdateServiceAccount } from "@/data/service-accounts/update-service-account";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateServiceAccount } from "@/types/service-accounts";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, useToast } from "@zenml-io/react-component-library";

interface ToggleActiveServiceAccountProps {
	isActive: boolean;
	serviceAccountId: string;
}

export default function ToggleActiveServiceAccount({
	isActive,
	serviceAccountId
}: ToggleActiveServiceAccountProps) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate } = useUpdateServiceAccount({
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
				queryKey: serviceAccountQueryKeys.serviceAccountsKey()
			});
		}
	});

	function updateServiceAccount(newActiveStatus: boolean) {
		const updateApiData: UpdateServiceAccount = {
			active: newActiveStatus
		};
		mutate({
			serviceAccountId,
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
