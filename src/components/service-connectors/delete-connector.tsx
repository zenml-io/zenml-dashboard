import { AlertDialog } from "@zenml-io/react-component-library";
import { DeleteAlertContent, DeleteAlertContentBody } from "../DeleteAlertDialog";
type Props = {
	deleteHandler: () => void;
};

export function DeleteConnectorAlertBody({ deleteHandler }: Props) {
	return (
		<DeleteAlertContent title="Delete Connectors" handleDelete={deleteHandler}>
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

export function DeleteConnectorAlert({
	deleteHandler,
	open,
	setOpen
}: DeleteStackComponentAlertProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteConnectorAlertBody deleteHandler={deleteHandler} />
		</AlertDialog>
	);
}
