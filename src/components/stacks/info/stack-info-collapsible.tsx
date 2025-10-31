import {
	Avatar,
	AvatarFallback,
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";
import { PropsWithChildren, useState } from "react";
import { CollapsibleChevron } from "../../collapsible-chevron";

type Props = {
	stackName: string;
};

export function StackInfoCollapsible({ children, stackName }: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(true);
	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex h-9 items-center p-0">
				<CollapsibleTrigger className="flex w-full items-center gap-2 px-5 py-3">
					<CollapsibleChevron open={open} />
					<div className="group/copybutton flex items-center gap-2">
						<Avatar type="square" size="md">
							<AvatarFallback size="md">{stackName[0] || "S"}</AvatarFallback>
						</Avatar>
						<div className="text-left">
							<p className="text-text-sm text-theme-text-tertiary">Stack</p>
							<p className="text-text-lg">{stackName}</p>
						</div>
					</div>
				</CollapsibleTrigger>
			</CollapsibleHeader>

			<CollapsibleContent
				className={cn(
					"space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3"
				)}
			>
				{children}
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
