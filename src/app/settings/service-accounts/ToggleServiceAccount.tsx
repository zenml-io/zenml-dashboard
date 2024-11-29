import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useUpdateServiceAccount } from "@/data/service-accounts/update-service-account";
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
}

export default function ToggleActiveServiceAccount({
	isActive,
	serviceAccountId
}: ToggleActiveServiceAccountProps) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

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
			serviceAccountId,
			body: updateApiData
		});
	}

	return (
		<>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deactivate Service Account</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="p-5 text-text-md text-theme-text-secondary">
						<p>Are you sure?</p>
						<p>
							You won't be able to use any API keys of this service account to authenticate with the
							server anymore.
						</p>
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
