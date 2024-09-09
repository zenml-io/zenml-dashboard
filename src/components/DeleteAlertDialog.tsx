import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from "react";
import { z } from "zod";
import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Input
} from "@zenml-io/react-component-library";
import { useForm } from "react-hook-form";

const deleteConfirmSchema = z
	.object({
		delete: z.string()
	})
	.refine((data) => data.delete === "DELETE", {
		message: "Please type DELETE to confirm"
	});

type DeleteConfirm = z.infer<typeof deleteConfirmSchema>;

type RunDeleteAlertContent = {
	title: ReactNode;
	handleDelete: () => void;
};
export const DeleteAlertContent = forwardRef<
	ElementRef<typeof AlertDialogContent>,
	ComponentPropsWithoutRef<typeof AlertDialogContent> & RunDeleteAlertContent
>(({ handleDelete, title }, ref) => {
	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<DeleteConfirm>({
		resolver: zodResolver(deleteConfirmSchema),
		defaultValues: { delete: "" }
	});

	return (
		<AlertDialogContent ref={ref}>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
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

DeleteAlertContent.displayName = "DeleteAlertContent";
