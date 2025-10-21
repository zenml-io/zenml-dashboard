import { Codesnippet } from "@/components/CodeSnippet";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription
} from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef } from "react";
import { InfoBox as InfoboxPrimitive } from "@/components/Infobox";

type Props = Omit<ComponentPropsWithoutRef<typeof DialogContent>, "children"> & {
	name: string;
};

export function UpdateStackDialogContent({ name, ...props }: Props) {
	return (
		<DialogContent {...props}>
			<DialogHeader>
				<DialogTitle>Update Stack</DialogTitle>
			</DialogHeader>
			<div className="space-y-5 p-7">
				<Infobox action="update" />

				<div className="space-y-1">
					<DialogDescription className="text-text-sm text-theme-text-secondary">
						Update a stack
					</DialogDescription>
					<Codesnippet
						codeClasses="whitespace-pre-wrap"
						wrap
						code={`zenml stack update ${name} -o NEW_ORCHESTRATOR_NAME`}
					/>
				</div>
			</div>
		</DialogContent>
	);
}

type InfoProps = {
	action: "delete" | "update" | "describe";
};
function Infobox({ action }: InfoProps) {
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
