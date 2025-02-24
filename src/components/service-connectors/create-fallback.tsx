import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@zenml-io/react-component-library/components/client";
import { Codesnippet } from "../CodeSnippet";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function CreateServiceConnectorFallback({ open, setOpen }: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create Service Connector</DialogTitle>
				</DialogHeader>
				<div className="min-w-0 p-5">
					<div className="min-w-0 max-w-full space-y-1">
						<p>Create a new service connector</p>
						<Codesnippet
							wrap
							code={`zenml service-connector register <NAME> --type=<TYPE> --interactive`}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
