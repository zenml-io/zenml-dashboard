import { DialogContent, DialogHeader, DialogTitle } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { InfoBox as InfoboxPrimitive } from "@/components/Infobox";
import { Codesnippet } from "@/components/CodeSnippet";

type Props = {
	closeModal?: () => void;
	name: string;
};

export const UpdateStackDialog = forwardRef<
	ElementRef<typeof DialogContent>,
	ComponentPropsWithoutRef<typeof DialogContent> & Props
>(({ closeModal, name, ...rest }, ref) => {
	return (
		<DialogContent {...rest} ref={ref}>
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
	);
});

UpdateStackDialog.displayName = "UpdateStackDialog";

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
