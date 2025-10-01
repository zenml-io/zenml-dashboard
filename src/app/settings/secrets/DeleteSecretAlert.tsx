import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { useDeleteSecret } from "@/data/secrets/delete-secret-query";
import { useQueryClient } from "@tanstack/react-query";
import { AlertDialog } from "@zenml-io/react-component-library";

type Props = {
	secretId: string;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function DeleteSecretAlert({ secretId, open, setOpen }: Props) {
	const queryClient = useQueryClient();
	const { mutate } = useDeleteSecret({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
		}
	});

	function deleteSecret() {
		mutate(secretId);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteAlertContent title="Delete Secret" handleDelete={deleteSecret}>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
