import { pipelineQueries } from "@/data/pipelines";
import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";

type Props = {
	githubPipelines: string[];
};

export function PipelineProgress({ githubPipelines }: Props) {
	const piplines = useQuery({
		...pipelineQueries.pipelineList({
			name: `oneof:${JSON.stringify(githubPipelines)}`
		})
	});

	if (piplines.isPending) {
		return <Skeleton className="h-1 w-full" />;
	}

	if (piplines.isError) {
		return null;
	}

	const apiPipelines = piplines.data.items.length;

	const progress = (apiPipelines / githubPipelines.length) * 100;

	return (
		<div className="flex items-center gap-2">
			<div className="whitespace-nowrap text-text-sm">
				{apiPipelines}/{githubPipelines.length}
			</div>
			<ProgressBar className="h-1 w-full rounded-rounded" value={progress} />
		</div>
	);
}
