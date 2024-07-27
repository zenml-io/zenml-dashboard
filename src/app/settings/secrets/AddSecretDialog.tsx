import React, { useEffect, useState } from "react";
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
import { useCreateSecretMutation } from "@/data/secrets/create-secret-query";
import { isFetchError } from "@/lib/fetch-error";

interface KeyValue {
	key: string;
	value: string;
}

interface Workspace {
	id: string;
}
export function AddSecretDialog({ id, workspace }: { id: string; workspace: Workspace }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				setOpen(val);
			}}
		>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Add Secret
				</Button>
			</DialogTrigger>
			<DialogContent className="mx-auto w-[90vw] max-w-[744px]">
				<DialogHeader>
					<DialogTitle>Register New Secret</DialogTitle>
				</DialogHeader>
				<AddSecret userId={id} setOpen={setOpen} workspaceId={workspace.id} />
			</DialogContent>
		</Dialog>
	);
}

export function AddSecret({
	userId,
	setOpen,
	workspaceId
}: {
	userId: string;
	setOpen: (open: boolean) => void;
	workspaceId: string;
}) {
	const [secretName, setSecretName] = useState("");
	const [keysValues, setKeysValues] = useState<KeyValue[]>([{ key: "", value: "" }]);

	const addKeyValuePair = () => {
		// Check if all previous key-value pairs are filled
		const allFilled = keysValues.every((pair) => pair.key !== "" && pair.value !== "");
		if (allFilled) {
			setKeysValues([...keysValues, { key: "", value: "" }]);
		} else {
			alert("Please fill out all previous key-value pairs before adding a new one.");
		}
	};

	useEffect(() => {});

	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useCreateSecretMutation({
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
			setOpen(false);
			setSecretName("");
			setKeysValues([{ key: "", value: "" }]);
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

	const postSecret = () => {
		mutate({
			user: userId,
			workspace: workspaceId,
			name: secretName,
			scope: "workspace",
			values: keysValues.reduce(
				(acc, pair) => {
					if (pair.key && pair.value) acc[pair.key] = pair.value;
					return acc;
				},
				{} as Record<string, string>
			)
		});
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		postSecret();
	};

	return (
		<>
			<form id="create-secret-form" className="space-y-5 p-7" onSubmit={handleSubmit}>
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
								<div onClick={addKeyValuePair} className="mt-5">
									<PlusIcon />
								</div>
							)}
							{index !== keysValues.length - 1 && (
								<div onClick={() => removeKeyValuePair(index)} className="mt-5">
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
				<Button
					intent="primary"
					type="submit"
					form="create-secret-form"
					// onClick={handleSubmit}
				>
					Register Secret
				</Button>
			</DialogFooter>
		</>
	);
}
