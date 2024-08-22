import { useDeleteSecret } from "@/data/secrets/delete-secret-query";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input
} from "@zenml-io/react-component-library";
import { useState, ChangeEvent } from "react";

export function DeleteSecretAlert({ secretId }: { secretId: string }) {
	const queryClient = useQueryClient();
	const { mutate } = useDeleteSecret({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
		}
	});

	const [inputValue, setInputValue] = useState("");

	function deleteSecret() {
		mutate(secretId);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete secret</DialogTitle>
			</DialogHeader>
			<div className="gap-5 p-5">
				<p className="text-text-md  text-theme-text-secondary">
					Are you sure you want to delete this secret?
				</p>
				<p className="text-text-md  text-theme-text-secondary">This action cannot be undone.</p>
				<h3 className="font-inter text-sm mb-1 mt-4 text-left font-medium leading-5">
					Please type DELETE to confirm
				</h3>
				<Input
					name="key"
					onChange={handleInputChange}
					className="w-full"
					required
					value={inputValue}
				/>
			</div>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button
					intent="danger"
					type="submit"
					form="edit-secret-form"
					onClick={deleteSecret}
					disabled={inputValue !== "DELETE"}
				>
					Delete
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
