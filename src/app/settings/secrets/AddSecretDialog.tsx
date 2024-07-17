import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

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
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle> Register New Secret</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
