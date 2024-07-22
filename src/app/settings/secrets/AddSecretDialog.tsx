import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input
} from "@zenml-io/react-component-library";
import PlusIcon from "@/assets/icons/secret-add.svg?react";
import DeleteIcon from "@/assets/icons/secret-delete.svg?react";

interface KeyValue {
	key: string;
	value: string;
}

export function AddSecretDialog() {
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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Register New Secret</DialogTitle>
				</DialogHeader>
				<AddSecret />
			</DialogContent>
		</Dialog>
	);
}

function AddSecret() {
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
		setSecretName("");
		setKeysValues([{ key: "", value: "" }]);
	};

	return (
		<>
			<form id="create-secret-form" className="space-y-5 p-7" onSubmit={handleSubmit}>
				<div className="space-y-5">
					<div className="space-y-0.5">
						<label className="text-text-sm">Secret Name</label>
						<Input
							className="w-full"
							value={secretName}
							onChange={(e) => setSecretName(e.target.value)}
							required
						/>
					</div>
					<h1>Keys</h1>
					{keysValues.map((pair, index) => (
						<div key={index} className="flex flex-row items-center space-x-1">
							<div className="flex-grow">
								<label className="text-sm">Key</label>
								<Input
									name="key"
									value={pair.key}
									onChange={(event) => handleInputChange(index, event)}
									className="w-full"
									required
								/>
							</div>
							<div className="flex-grow">
								<label className="text-sm">Value</label>
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
				<Button intent="primary" type="submit">
					Register Secret
				</Button>
			</DialogFooter>
		</>
	);
}

export default AddSecret;
