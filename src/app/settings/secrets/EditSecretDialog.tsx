import React, { useState, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	useToast
} from "@zenml-io/react-component-library";
import PlusIcon from "@/assets/icons/secret-add.svg?react";
import DeleteIcon from "@/assets/icons/secret-delete.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateSecret } from "@/types/secret";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";

interface EditSecretDialogProps {
	secretId: string;
	isOpen: boolean;
	onClose: () => void;
}

export function EditSecretDialog({ secretId, isOpen, onClose }: EditSecretDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Edit Secret
				</Button>
			</DialogTrigger>
			<DialogContent className="mx-auto w-[90vw] max-w-[744px]">
				<DialogHeader>
					<DialogTitle>Edit Secret</DialogTitle>
				</DialogHeader>
				<EditSecret secretId={secretId} onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
}

interface EditSecretProps {
	secretId: string;
	onClose: () => void;
}
interface KeyValue {
	key: string;
	value: string;
}

export function EditSecret({ secretId, onClose }: EditSecretProps) {
	const { data: secretDetail, isLoading, isError } = useGetSecretDetail(secretId);
	const [secretName, setSecretName] = useState<string>("");
	const [keysValues, setKeysValues] = useState<KeyValue[]>([{ key: "", value: "" }]);

	useEffect(() => {
		if (secretDetail) {
			setSecretName(secretDetail.name);
			setKeysValues(
				Object.entries(secretDetail.body.values || {}).map(([key, value]) => ({
					key,
					value: String(value)
				}))
			);
		}
	}, [secretDetail]);

	const addKeyValuePair = () => {
		const allFilled = keysValues.every((pair) => pair.key !== "" && pair.value !== "");
		if (allFilled) {
			setKeysValues([...keysValues, { key: "", value: "" }]);
		} else {
			alert("Please fill out all previous key-value pairs before adding a new one.");
		}
	};

	const { toast } = useToast();
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
			onClose(); // Close dialog on success
		}
	});

	const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const updatedKeysValues = keysValues.map((pair, idx) =>
			idx === index ? { ...pair, [name]: value } : pair
		);
		setKeysValues(updatedKeysValues);
	};

	const removeKeyValuePair = (index: number) => {
		if (keysValues.length > 1) {
			const updatedKeysValues = [...keysValues];
			updatedKeysValues.splice(index, 1);
			setKeysValues(updatedKeysValues);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const updatedSecretData: UpdateSecret = {
			name: secretName,
			scope: "workspace", // Ensure this is a valid value from components["schemas"]["SecretScope"]
			values: keysValues.reduce(
				(acc, pair) => {
					if (pair.key && pair.value) acc[pair.key] = pair.value;
					return acc;
				},
				{} as Record<string, unknown>
			)
		};
		mutate({ id: secretId, body: updatedSecretData });
	};

	if (isLoading) return <p></p>;
	if (isError) return <p>Error fetching secret details.</p>;

	return (
		<>
			<form id="edit-secret-form" className="space-y-5 p-7" onSubmit={handleSubmit}>
				<div className="space-y-5">
					<div className="space-y-0.5">
						<label className="font-inter text-sm text-left font-medium leading-5">
							Secret Name
						</label>
						<Input
							className="w-full"
							value={secretName}
							onChange={(e) => setSecretName(e.target.value)}
							required
						/>
					</div>
					<h1 className="font-inter text-lg text-left font-semibold leading-7">Keys</h1>
					{keysValues.map((pair, index) => (
						<div key={index} className="flex flex-row items-center space-x-1">
							<div className="flex-grow">
								<label className="font-inter text-sm text-left font-medium leading-5">Key</label>
								<Input
									name="key"
									value={pair.key}
									onChange={(event) => handleInputChange(index, event)}
									className="w-full"
									required
								/>
							</div>
							<div className="flex-grow">
								<label className="font-inter text-sm text-left font-medium leading-5">Value</label>
								<Input
									name="value"
									value={pair.value}
									onChange={(event) => handleInputChange(index, event)}
									className="w-full"
									required
								/>
							</div>
							{index === keysValues.length - 1 && (
								<div onClick={addKeyValuePair} className="mt-5 cursor-pointer">
									<PlusIcon />
								</div>
							)}
							{index !== keysValues.length - 1 && (
								<div onClick={() => removeKeyValuePair(index)} className="mt-5 cursor-pointer">
									<DeleteIcon />
								</div>
							)}
						</div>
					))}
				</div>
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button intent="primary" type="submit" form="edit-secret-form">
					Save Secret
				</Button>
			</DialogFooter>
		</>
	);
}
