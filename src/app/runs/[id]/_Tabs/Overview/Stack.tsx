import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStack } from "@/data/stacks/stack-detail-query";
import { StackComponentsList } from "@/types/stack";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	Tag
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StackComponentCollapsible } from "./ComponentCollapsible";
import { PipelineRun } from "@/types/pipeline-runs";
import { routes } from "@/router/routes";

export function StackCollapsible() {
	const [open, setOpen] = useState(true);
	const { runId } = useParams() as { runId: string };

	const {
		data: runData,
		isError: isRunError,
		isPending: isRunPending
	} = usePipelineRun({ runId: runId }, { throwOnError: true });

	const stackId = runData?.body?.stack?.id;

	if (isRunPending) {
		return <Skeleton className="h-[250px] w-full" />;
	}

	if (isRunError) {
		return null;
	}

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex justify-between">
				<CollapsibleTrigger className=" flex w-full items-center justify-between">
					<div className="flex items-center gap-[10px]">
						<ChevronDown
							className={` ${
								open ? "" : "-rotate-90"
							} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
						/>
						Stack
					</div>
				</CollapsibleTrigger>

				<Link to={routes.stacks.overview}>
					<Tag
						rounded={false}
						className="inline-flex items-center gap-0.5"
						color="turquoise"
						emphasis="subtle"
					>
						<Stack className="h-4 w-4 fill-current" />
						<span>{runData?.body?.stack?.name}</span>
					</Tag>
				</Link>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<StackComponentsContent stackId={stackId!} run={runData} />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

type StackComponentsContentProps = {
	stackId: string;
	run: PipelineRun;
};
function StackComponentsContent({ stackId, run }: StackComponentsContentProps) {
	const { data, isError, isPending } = useStack({ stackId: stackId });

	if (isError) return null;
	if (isPending) {
		return (
			<div className="space-y-5">
				{Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={i} className="h-8 w-full" />
				))}
			</div>
		);
	}

	return (
		<ul className="space-y-5">
			{Object.values((data?.metadata?.components as StackComponentsList) || {}).map((component) => (
				<li key={component[0].id} className="flex w-full items-center justify-between">
					<StackComponentCollapsible component={component[0]} run={run} />
				</li>
			))}
		</ul>
	);
}
