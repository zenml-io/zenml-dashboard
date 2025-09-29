import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { secretQueries } from "@/data/secrets";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateSecret } from "@/types/secret";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, toast } from "@zenml-io/react-component-library";

type Props = {
	secretId: string;
	keyName: string;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function DeleteKeyAlert({ secretId, keyName, open, setOpen }: Props) {
	const {
		data: secretDetail,
		isLoading,
		isError
	} = useQuery({ ...secretQueries.secretDetail(secretId) });
	const queryClient = useQueryClient();
	const { mutate } = useUpdateSecret({
		onError(error) {
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
			queryClient.invalidateQueries({ queryKey: ["secretDetail", secretId] });
		}
	});

	const deleteSecret = () => {
		if (secretDetail) {
			const updatedValues = { ...secretDetail.body?.values };
			delete updatedValues[keyName];

			const updatedSecretData: UpdateSecret = {
				name: secretDetail.name,
				values: updatedValues
			};

			mutate({ id: secretId, body: updatedSecretData });
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading secret details</div>;

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteAlertContent title="Delete Key" handleDelete={deleteSecret}>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
