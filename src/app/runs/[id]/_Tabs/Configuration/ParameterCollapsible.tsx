import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { NestedCollapsible } from "@/components/NestedCollapsible";
import { NotAvailable } from "@/components/not-available";
import { pipelineDeploymentQueries } from "@/data/pipeline-deployments";
import { useQuery } from "@tanstack/react-query";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	deploymentId?: string;
};

export function PipelineParamsCollapsible({ deploymentId }: Props) {
	const [open, setOpen] = useState(true);

	const { isLoading, isError, data } = useQuery({
		...pipelineDeploymentQueries.detail(deploymentId!),
		enabled: !!deploymentId
	});

	if (!deploymentId)
		return (
			<CollapsiblePanel open={open} onOpenChange={setOpen}>
				<CollapsibleHeader intent="primary" className="flex items-center gap-[10px]">
					<CollapsibleTrigger>
						<ChevronDown
							className={` ${
								open ? "" : "-rotate-90"
							} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
						/>
					</CollapsibleTrigger>
					Pipeline Parameters
				</CollapsibleHeader>
				<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
					<NotAvailable />
				</CollapsibleContent>
			</CollapsiblePanel>
		);

	if (isLoading) return <Skeleton className="h-[150px] w-full" />;
	if (isError) return null;

	return (
		<NestedCollapsible
			isInitialOpen
			title="Pipeline Parameters"
			data={data?.metadata?.pipeline_spec?.parameters}
		/>
	);
}
