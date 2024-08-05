import { Codesnippet } from "@/components/CodeSnippet";
import { snakeCaseToDashCase, snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

type Props = {
	closeModal?: () => void;
	type: StackComponentType;
};

export const CreateComponentFallback = forwardRef<
	ElementRef<typeof DialogContent>,
	ComponentPropsWithoutRef<typeof DialogContent> & Props
>(({ closeModal, type, children, ...rest }, ref) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl" {...rest} ref={ref}>
				<DialogHeader>
					<DialogTitle>Create New </DialogTitle>
				</DialogHeader>
				<div className="space-y-5 overflow-auto p-7">
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">
							Create a new {snakeCaseToTitleCase(type)}
						</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml ${snakeCaseToDashCase(
								type
							)} register ${type.toUpperCase()}_NAME --flavor=${type.toUpperCase()}_FLAVOR [--${type.toUpperCase()}_OPTIONS]`}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});

CreateComponentFallback.displayName = "UpdateStackDialog";
