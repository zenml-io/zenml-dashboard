import { CollapsibleCard } from "@/components/CollapsibleCard";
import { PropsWithChildren, ReactNode } from "react";
import { StackTag } from "../stack-tag";

type Props = {
	stackName: string;
	title?: ReactNode;
};

export function StackInfoCollapsible({
	children,
	stackName,
	title = "Stack"
}: PropsWithChildren<Props>) {
	return (
		<CollapsibleCard
			title={title}
			initialOpen={true}
			headerClassName="flex items-center gap-1 flex-wrap"
			headerChildren={<StackTag stackName={stackName} />}
		>
			{children}
		</CollapsibleCard>
	);
}
