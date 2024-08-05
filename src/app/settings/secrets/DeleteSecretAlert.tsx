import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Input,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "@zenml-io/react-component-library";
import { useDeleteSecret } from "@/data/secrets/delete-secret-query";

export function DeleteSecretAlert({
	secretId,
	isOpen,
	onClose
}: {
	secretId: string;
	isOpen: boolean;
	onClose: () => void;
}) {
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

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Delete Secret
				</Button>
			</DialogTrigger>
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
		</Dialog>
	);
}
