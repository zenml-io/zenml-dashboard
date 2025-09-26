import { AlertDialog } from "@zenml-io/react-component-library";
import { DeleteAlertContent, DeleteAlertContentBody } from "../DeleteAlertDialog";
type Props = {
	deleteHandler: () => void;
};

export function DeletePipelineSnapshotAlertBody({ deleteHandler }: Props) {
	return (
		<DeleteAlertContent title="Delete Pipeline Snapshots" handleDelete={deleteHandler}>
			<DeleteAlertContentBody>
				<p>Are you sure?</p>
				<p>This action cannot be undone.</p>
			</DeleteAlertContentBody>
		</DeleteAlertContent>
	);
}

type DeleteStackComponentAlertProps = {
	deleteHandler: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function DeletePipelineSnapshotAlert({
	deleteHandler,
	open,
	setOpen
}: DeleteStackComponentAlertProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeletePipelineSnapshotAlertBody deleteHandler={deleteHandler} />
		</AlertDialog>
	);
}
