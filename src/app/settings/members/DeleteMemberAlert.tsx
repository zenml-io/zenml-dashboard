import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { useDeleteUserMutation } from "@/data/users/delete-user-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";

type Props = {
	userId: string;
	name: string;
};
export function DeleteMemberAlert({ userId, name }: Props) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { isPending, mutate } = useDeleteUserMutation({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function deleteUser() {
		mutate(userId);
	}

	return (
		<DeleteAlertContent isPending={isPending} title="Delete Member" handleDelete={deleteUser}>
			<DeleteAlertContentBody>
				<p>Are you sure?</p>
				<p>
					Removing <strong>{name}</strong> cannot be undone.
				</p>
			</DeleteAlertContentBody>
		</DeleteAlertContent>
	);
}
