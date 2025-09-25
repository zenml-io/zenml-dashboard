import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox as InfoboxPrimitive } from "@/components/Infobox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@zenml-io/react-component-library";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	name: string;
};

export function UpdateStackDialog({ name, open, setOpen }: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Stack</DialogTitle>
				</DialogHeader>
				<div className="space-y-5 p-7">
					<Infobox action="update" />
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">Update a stack</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml stack update ${name} -o NEW_ORCHESTRATOR_NAME`}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

type InfoProps = {
	action: "delete" | "update" | "describe";
};
export function Infobox({ action }: InfoProps) {
	function getAction() {
		switch (action) {
			case "delete":
				return "delete";
			case "update":
				return "update";
			case "describe":
				return "get details of";
		}
	}

	return (
		<InfoboxPrimitive>
			<div className="flex w-full flex-wrap justify-between gap-2">
				<div className="min-w-0">
					<p className="truncate text-text-sm font-semibold">
						We are working on the new Stacks experience.
					</p>
					<p className="truncate text-text-sm">
						Meanwhile you can use the CLI to {getAction()} your stack.
					</p>
				</div>
			</div>
		</InfoboxPrimitive>
	);
}
