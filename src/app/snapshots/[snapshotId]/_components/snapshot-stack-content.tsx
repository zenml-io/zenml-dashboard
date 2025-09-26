import StackIcon from "@/assets/icons/stack.svg?react";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { ComponentCollapsible } from "@/components/stacks/info/ComponentCollapsible";
import { Stack, StackComponentsList } from "@/types/stack";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tag
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	stack: Stack;
};

export function StackContent({ stack }: Props) {
	const [open, setOpen] = useState(true);

	const stackName = stack.name;

	const components = Object.values(
		(stack.metadata?.components as StackComponentsList) ?? {}
	).flat();

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center justify-between">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Stack
				</CollapsibleTrigger>
				<div>
					<Tag
						className="flex w-fit items-center gap-1 whitespace-nowrap text-turquoise-600"
						color="turquoise"
						emphasis="subtle"
						rounded={false}
					>
						<StackIcon className="h-4 w-4 fill-current" />
						{stackName}
					</Tag>
				</div>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<ul className="space-y-5">
					{components.map((c) => (
						<li key={c.id} className="w-full">
							<ComponentCollapsible component={c} objectConfig={{}} />
						</li>
					))}
				</ul>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
