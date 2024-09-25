import { snakeCaseToDashCase, snakeCaseToLowerCase, snakeCaseToTitleCase } from "@/lib/strings";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { InfoBox } from "../../Infobox";
import { StackComponentType } from "@/types/components";
import { Codesnippet } from "../../CodeSnippet";

type Props = {
	name: string;
	type: StackComponentType;
};
export const ComponentInfoDialog = forwardRef<
	ElementRef<typeof DialogContent>,
	ComponentPropsWithoutRef<typeof DialogContent> & Props
>(({ name, children, type, ...rest }, ref) => {
	{
		return (
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="w-fit max-w-3xl" {...rest} ref={ref}>
					<DialogHeader>
						<DialogTitle>{snakeCaseToTitleCase(type || "")}</DialogTitle>
					</DialogHeader>
					<div className="space-y-5 truncate p-7">
						<InfoBox>
							<div className="flex w-full flex-wrap justify-between gap-2">
								<div className="min-w-0">
									<p className="truncate text-text-sm font-semibold">
										We are working on the new Stacks experience.
									</p>
									<p className="truncate text-text-sm">
										Meanwhile you can use the CLI to check the details of your component.
									</p>
								</div>
							</div>
						</InfoBox>
						<div className="space-y-1 truncate">
							<p className="text-text-sm text-theme-text-secondary">
								Describe your {snakeCaseToLowerCase(type)}
							</p>
							<Codesnippet
								codeClasses="whitespace-pre-wrap"
								wrap
								code={`zenml ${snakeCaseToDashCase(type)} describe ${name}`}
							/>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
});

ComponentInfoDialog.displayName = "ComponentInfoDialog";
