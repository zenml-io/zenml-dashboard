import Pipelines from "@/assets/icons/dataflow.svg?react";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { pipelineQueries } from "@/data/pipelines";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";
import { useActiveTab } from "./use-active-tab";
import { usePipelineDetailRunsBreadcrumbs } from "./use-breadcrumb";
import { capitalize } from "@/lib/strings";

export function PipelineDetailNameSection() {
	const { pipelineId } = useParams() as { pipelineId: string };

	const pipelineQuery = useQuery({
		...pipelineQueries.pipelineDetail(pipelineId),
		throwOnError: true
	});
	const activeTab = useActiveTab();

	usePipelineDetailRunsBreadcrumbs(capitalize(activeTab), pipelineQuery.data);

	if (pipelineQuery.isError) return null;
	if (pipelineQuery.isPending) return <PipelineDetailNameSectionSkeleton />;

	const name = pipelineQuery.data.name;
	const status = pipelineQuery.data.resources?.latest_run_status;

	return (
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-1">
				<Pipelines className={`size-5 shrink-0 ${getExecutionStatusColor(status)}`} />
				<h1 className="text-display-xs font-semibold">{name}</h1>
			</div>
			<ExecutionStatusIcon className="size-5 shrink-0" status={status} />
		</div>
	);
}

export function PipelineDetailNameSectionSkeleton() {
	return (
		<div className="flex items-center justify-between">
			{/* Left side content */}
			<div className="flex items-center gap-3">
				{/* Pipeline icon and title */}
				<div className="flex items-center gap-1">
					<Skeleton className="size-6 shrink-0" /> {/* Pipeline icon */}
					<Skeleton className="h-6 w-[200px]" /> {/* Pipeline title */}
				</div>
				{/* Execution status icon */}
				<Skeleton className="size-6 shrink-0" />
				{/* Tags section */}
				<div className="flex flex-wrap gap-0.5">
					<Skeleton className="h-6 w-[45px]" />
					<Skeleton className="h-6 w-[75px]" />
				</div>
			</div>
			{/* Right side - Share button */}
			<Skeleton className="aspect-square size-6" />
		</div>
	);
}
