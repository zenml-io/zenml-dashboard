import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { AlertDialog } from "@zenml-io/react-component-library/components/client";

type DeleteStackComponentAlertProps = {
	deleteHandler: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function DeleteStackAlert({ deleteHandler, open, setOpen }: DeleteStackComponentAlertProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteAlertContent title="Delete Stack" handleDelete={deleteHandler}>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
