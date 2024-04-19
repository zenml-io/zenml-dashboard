import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	Button,
	AlertDialogAction,
	useToast
} from "@zenml-io/react-component-library";
import { useDeleteUserMutation } from "@/data/users/delete-user-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Icon } from "@/components/Icon";

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
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
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
		<AlertDialogContent className="p-0">
			<AlertDialogTitle className="py-2 pl-5 pr-3 text-text-lg font-semibold">
				Delete Member
			</AlertDialogTitle>
			<div className="border-y border-theme-border-moderate px-5 py-5">
				<AlertDialogDescription>
					Deleting <strong>{name}</strong> cannot be undone.
				</AlertDialogDescription>
			</div>
			<div className="flex justify-end gap-3 px-5 py-3">
				<AlertDialogCancel asChild>
					<Button intent="secondary">Cancel</Button>
				</AlertDialogCancel>
				<AlertDialogAction asChild>
					<Button onClick={deleteUser} disabled={isPending} intent="danger">
						Delete
					</Button>
				</AlertDialogAction>
			</div>
		</AlertDialogContent>
	);
}
