import Trash from "@/assets/icons/trash.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Input
} from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRunsSelectorContext } from "./RunsSelectorContext";

const deleteSchema = z
	.object({
		delete: z.string()
	})
	.refine((data) => data.delete === "DELETE", {
		message: "Please type DELETE to confirm"
	});

type DeleteConfirm = z.infer<typeof deleteSchema>;

export function DeleteRunAlert() {
	const [isOpen, setIsOpen] = useState(false);
	const { bulkDeleteRuns, selectedRuns } = useRunsSelectorContext();

	async function handleDelete() {
		await bulkDeleteRuns(selectedRuns);
		setIsOpen(false);
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger>
				<Button
					className="rounded-sharp border-none bg-white"
					size="md"
					emphasis="subtle"
					intent="secondary"
				>
					<Trash className="h-5 w-5 shrink-0 gap-1 fill-neutral-400" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<DeleteRunAlertContent handleDelete={handleDelete} />
		</AlertDialog>
	);
}

type RunDeleteAlertContent = {
	handleDelete: () => void;
};
export const DeleteRunAlertContent = forwardRef<
	ElementRef<typeof AlertDialogContent>,
	ComponentPropsWithoutRef<typeof AlertDialogContent> & RunDeleteAlertContent
>(({ handleDelete }, ref) => {
	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<DeleteConfirm>({
		resolver: zodResolver(deleteSchema),
		defaultValues: { delete: "" }
	});

	return (
		<AlertDialogContent ref={ref}>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete Runs</AlertDialogTitle>
			</AlertDialogHeader>
			<form
				onSubmit={handleSubmit(() => handleDelete())}
				id="delete-form"
				className="space-y-5 p-5"
			>
				<div>
					<p className="text-text-md text-theme-text-secondary">Are you sure?</p>
					<p className="text-text-md text-theme-text-secondary">This action cannot be undone.</p>
				</div>
				<div className="space-y-1">
					<label className="mb-0.5 text-text-sm">Please type DELETE to confirm</label>
					<Input onPaste={(e) => e.preventDefault()} {...register("delete")} className="w-full" />
				</div>
			</form>
			<AlertDialogFooter className="gap-[10px]">
				<AlertDialogCancel asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</AlertDialogCancel>
				<Button form="delete-form" disabled={!isValid} intent="danger" type="submit">
					Delete
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
});

DeleteRunAlertContent.displayName = "DeleteRunAlertContent";
