import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { InfoBox } from "@/components/Infobox";
import { AlertDialog } from "@zenml-io/react-component-library";

type Props = {
	deleteHandler: () => void;
};

export function DeleteStackComponentAlertBody({ deleteHandler }: Props) {
	return (
		<DeleteAlertContent title="Delete Components" handleDelete={deleteHandler}>
			<DeleteAlertContentBody>
				<p>Are you sure?</p>
				<p>This action cannot be undone.</p>
				<InfoBox className="mt-4 text-theme-text-primary">
					If a component is still part of a stack, it will not be deleted.
				</InfoBox>
			</DeleteAlertContentBody>
		</DeleteAlertContent>
	);
}

type DeleteStackComponentAlertProps = {
	deleteHandler: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function DeleteStackComponentAlert({
	deleteHandler,
	open,
	setOpen
}: DeleteStackComponentAlertProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteStackComponentAlertBody deleteHandler={deleteHandler} />
		</AlertDialog>
	);
}
