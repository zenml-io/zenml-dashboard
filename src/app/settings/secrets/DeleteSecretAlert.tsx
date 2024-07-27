import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	Button,
	AlertDialogAction,
	Input
} from "@zenml-io/react-component-library";
import { useDeleteSecret } from "@/data/secrets/delete-secret-query";

export function DeleteSecretAlert({ secretId }: { secretId: string }) {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useDeleteSecret({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
		}
	});

	const [inputValue, setInputValue] = useState("");

	function deleteSecret() {
		mutate(secretId);
	}

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	return (
		<AlertDialogContent className="p-0">
			<AlertDialogTitle className="py-2 pl-5 pr-3 text-text-lg font-semibold">
				Delete Secret
			</AlertDialogTitle>
			<div className="border-y border-theme-border-moderate px-5 py-5">
				<AlertDialogDescription>
					<p className="text-text-md">Are you sure you want to delete this secret?</p>
					<p className="text-text-md">This action cannot be undone</p>
				</AlertDialogDescription>
				<h3 className="font-inter text-sm mt-4 text-left font-medium leading-5">
					Please type DELETE to confirm
				</h3>
				<Input name="key" onChange={handleInputChange} className="w-full" required />
			</div>

			<div className="flex justify-end gap-3 px-5 py-3">
				<AlertDialogCancel asChild>
					<Button intent="secondary">Cancel</Button>
				</AlertDialogCancel>
				<AlertDialogAction asChild>
					<Button
						intent="danger"
						onClick={deleteSecret}
						disabled={isPending || inputValue !== "DELETE"}
					>
						Delete
					</Button>
				</AlertDialogAction>
			</div>
		</AlertDialogContent>
	);
}
