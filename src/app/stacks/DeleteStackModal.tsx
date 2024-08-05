import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useDeleteStack } from "./useDeleteStack";

type DeleteDialogProps = {
	closeModal?: () => void;
	name: string;
	stackId: string;
};

export const DeleteStackDialog = forwardRef<
	ElementRef<typeof AlertDialogContent>,
	ComponentPropsWithoutRef<typeof AlertDialogContent> & DeleteDialogProps
>(({ closeModal, name, stackId, ...rest }, ref) => {
	const { handleDelete, deleteStack } = useDeleteStack(stackId);

	return (
		<AlertDialogContent {...rest} className="p-0" ref={ref}>
			<AlertDialogTitle className="m-0 py-2 pl-5 pr-3 text-text-lg font-semibold">
				Delete {name}
			</AlertDialogTitle>
			<div className="border-y border-theme-border-moderate px-5 py-5">
				<AlertDialogDescription>
					Are you sure you want to delete this stack? <br />
					This action cannot be undone.
				</AlertDialogDescription>
			</div>
			<div className="flex justify-end gap-3 px-5 py-3">
				<AlertDialogCancel onClick={() => closeModal?.()} asChild>
					<Button intent="secondary">Cancel</Button>
				</AlertDialogCancel>
				<Button
					disabled={deleteStack.isPending}
					type="button"
					onClick={() => handleDelete()}
					intent="danger"
				>
					{deleteStack.isPending && (
						<div
							role="alert"
							aria-busy="true"
							className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-error"
						></div>
					)}
					Delete
				</Button>
			</div>
		</AlertDialogContent>
	);
});

DeleteStackDialog.displayName = "DeleteStackDialog";
