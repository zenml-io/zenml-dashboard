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
import { useId, useState } from "react";

export function AddMemberDialog() {
	const [open, setOpen] = useState(false);
	const [showSuccesNewMember] = useState(false);

	// 	async function submitForm() {
	// 		// Show when succesfull response
	// 		setShowSuccesNewMember(true);
	// 	}

	// 	const SuccessAddMember = () => (
	// 		<div className="p-7 text-center">
	// 			<UserIcon className={`m-auto mb-5 h-[110px] w-[110px] fill-success-500`} />

	// 			<p className="mb-5 text-text-sm font-semibold text-theme-text-primary">{`The user ${name} was created successfully!`}</p>
	// 			<p className="mb-5 text-text-sm font-semibold text-theme-text-secondary">
	// 				Share the invitation link with the user to complete the registration.
	// 			</p>
	// 			<Codesnippet code="https://128.0.2.1:8897/signup?user" />
	// 		</div>
	// 	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Add Members
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> Add a New Member</DialogTitle>
				</DialogHeader>
				{showSuccesNewMember ? <SuccessAddMember /> : <AddMemberForm />}
			</DialogContent>
		</Dialog>
	);
}

function AddMemberForm() {
	const usernameId = useId();
	return (
		<>
			<form className="space-y-5 p-7">
				<div className="space-y-2">
					<div className="space-y-0.5">
						<label htmlFor={usernameId} className="text-text-sm">
							Username
						</label>
						<Input id={usernameId} className="w-full" />
					</div>
				</div>
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button size="sm">Generate Token</Button>
			</DialogFooter>
		</>
	);
}

function SuccessAddMember() {
	return <p>Success</p>;
}
