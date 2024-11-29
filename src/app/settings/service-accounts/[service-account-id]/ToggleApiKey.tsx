import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useUpdateApiKey } from "@/data/service-accounts/update-api-key";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateServiceAccount } from "@/types/service-accounts";
import { useQueryClient } from "@tanstack/react-query";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Switch,
	useToast
} from "@zenml-io/react-component-library";
import { useState } from "react";

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
	const [open, setOpen] = useState(false);

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

	function handleCheckChange(b: boolean) {
		if (!b) setOpen(true);
		else {
			updateServiceAccount(b);
		}
	}

	async function updateServiceAccount(newActiveStatus: boolean) {
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
		<>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deactivate API Key</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="p-5 text-text-md text-theme-text-secondary">
						<p>Are you sure?</p>
						<p>You won't be able to use this API Key to authenticate with the server anymore.</p>
					</div>
					<AlertDialogFooter className="gap-[10px]">
						<AlertDialogCancel asChild>
							<Button size="sm" intent="secondary">
								Cancel
							</Button>
						</AlertDialogCancel>
						<Button
							onClick={() => updateServiceAccount(false).then((_) => setOpen(false))}
							intent="primary"
							type="button"
						>
							Deactivate
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<Switch checked={isActive} onCheckedChange={handleCheckChange} />
		</>
	);
}
