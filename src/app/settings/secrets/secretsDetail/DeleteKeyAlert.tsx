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
	DialogClose,
	toast
} from "@zenml-io/react-component-library";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateSecret } from "@/types/secret";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";

export function DeleteKeyAlert({
	secretId,
	isOpen,
	onClose,
	keyName
}: {
	secretId: string;
	isOpen: boolean;
	onClose: () => void;
	keyName: string;
}) {
	const { data: secretDetail, isLoading, isError } = useGetSecretDetail(secretId);
	const queryClient = useQueryClient();
	const { mutate } = useUpdateSecret({
		onError(error) {
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
			queryClient.invalidateQueries({ queryKey: ["secretDetail", secretId] });
			onClose();
		}
	});

	const [inputValue, setInputValue] = useState("");

	const deleteSecret = () => {
		if (secretDetail) {
			const updatedValues = { ...secretDetail.body.values };
			delete updatedValues[keyName];

			const updatedSecretData: UpdateSecret = {
				name: secretDetail.secretName,
				scope: "workspace",
				values: updatedValues
			};

			mutate({ id: secretId, body: updatedSecretData });
		}
	};

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading secret details</div>;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Delete Secret
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Key</DialogTitle>
				</DialogHeader>
				<div className="gap-5 p-5">
					<p className="text-text-md text-theme-text-secondary">
						Are you sure you want to delete this eky?
					</p>
					<p className="text-text-md text-theme-text-secondary">This action cannot be undone.</p>
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
						type="button"
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
