import { snakeCaseToDashCase, snakeCaseToLowerCase, snakeCaseToTitleCase } from "@/lib/strings";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@zenml-io/react-component-library";
import { Codesnippet } from "../CodeSnippet";
import { InfoBox } from "../Infobox";
import { StackComponentType } from "@/types/components";

type Props = {
	name: string;
	type: StackComponentType;
};

export const ComponentFallbackDialog = forwardRef<
	ElementRef<typeof DialogContent>,
	ComponentPropsWithoutRef<typeof DialogContent> & Props
>(({ name, children, type, ...rest }, ref) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="w-fit max-w-fit" {...rest} ref={ref}>
				<DialogHeader>
					<DialogTitle>{snakeCaseToTitleCase(type || "")}</DialogTitle>
				</DialogHeader>
				<div className="space-y-5 p-7">
					<Info type={type} />
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">
							Describe your {snakeCaseToLowerCase(type)}
						</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml ${snakeCaseToDashCase(type)} describe ${name}`}
						/>
					</div>
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">
							Update your {snakeCaseToLowerCase(type)}
						</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml ${snakeCaseToDashCase(type)} update ${name}`}
						/>
					</div>
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">
							Remove your {snakeCaseToLowerCase(type)}
						</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml ${snakeCaseToDashCase(type)} delete ${name}`}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});

ComponentFallbackDialog.displayName = "ComponentFallbackDialog";

type InfoProps = {
	type: StackComponentType;
};
function Info({ type }: InfoProps) {
	return (
		<InfoBox>
			<div className="flex w-full flex-wrap justify-between gap-2">
				<div className="min-w-0">
					<p className="truncate text-text-sm font-semibold">
						We are working on the new Stacks experience.
					</p>
					<p className="truncate text-text-sm">
						Meanwhile you can use the CLI to manage your {snakeCaseToLowerCase(type)}.
					</p>
				</div>
			</div>
		</InfoBox>
	);
}
