import { UpdateStackDialogContent } from "@/components/stacks/update-stack-dialog";
import { Dialog } from "@zenml-io/react-component-library";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	name: string;
};

export function UpdateStackDialog({ name, open, setOpen }: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<UpdateStackDialogContent name={name} className="lg:min-w-[600px]" />
		</Dialog>
	);
}
