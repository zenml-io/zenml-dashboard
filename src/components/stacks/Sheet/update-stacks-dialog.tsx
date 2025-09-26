import { UpdateButtonContent } from "@/components/buttons/update-button-content";
import { DialogTrigger } from "@zenml-io/react-component-library";
import { Dialog } from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { UpdateStackDialogContent } from "../update-stack-dialog";

type Props = {
	name: string;
};
export function UpdateStackDialog({ name }: Props) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" size="sm" intent="primary" emphasis="subtle">
					<UpdateButtonContent />
				</Button>
			</DialogTrigger>
			<UpdateStackDialogContent name={name} className="lg:min-w-[600px]" />
		</Dialog>
	);
}
