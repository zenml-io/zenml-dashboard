import { secretQueries } from "@/data/secrets";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateSecret } from "@/types/secret";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Input,
	toast
} from "@zenml-io/react-component-library";
import { ChangeEvent, useState } from "react";

export function DeleteKeyAlert({ secretId, keyName }: { secretId: string; keyName: string }) {
	const {
		data: secretDetail,
		isLoading,
		isError
	} = useQuery({ ...secretQueries.secretDetail(secretId) });
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
		}
	});

	const [inputValue, setInputValue] = useState("");

	const deleteSecret = () => {
		if (secretDetail) {
			const updatedValues = { ...secretDetail.body?.values };
			delete updatedValues[keyName];

			const updatedSecretData: UpdateSecret = {
				name: secretDetail.name,
				scope: "workspace",
				values: updatedValues
			};

			mutate({ id: secretId, body: updatedSecretData });
		}
	};

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading secret details</div>;

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete Key</AlertDialogTitle>
			</AlertDialogHeader>
			<div className="gap-5 p-5">
				<p className="text-text-md text-theme-text-secondary">
					Are you sure you want to delete this key?
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
			<AlertDialogFooter className="gap-[10px]">
				<AlertDialogCancel asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</AlertDialogCancel>
				<Button
					intent="danger"
					type="button"
					onClick={deleteSecret}
					disabled={inputValue !== "DELETE"}
				>
					Delete
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
