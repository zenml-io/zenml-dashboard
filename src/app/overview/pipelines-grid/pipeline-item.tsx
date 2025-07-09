import { Tick } from "@/components/Tick";
import { useGithubPipelineContent } from "@/data/github/pipeline-content";
import {
	Box,
	ProgressOutstanding,
	Skeleton
} from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { GithubPipelineSheet } from "./pipeline-sheet";
import { snakeCaseToTitleCase } from "@/lib/strings";

type Props = {
	pipelineName: string;
	isDone: boolean;
};

export function PipelineItem({ pipelineName, isDone }: Props) {
	const [open, setOpen] = useState(false);
	const content = useGithubPipelineContent(pipelineName, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		refetchIntervalInBackground: false
	});

	if (content.isPending) {
		return <Skeleton className="h-[130px] w-full" />;
	}

	return (
		<GithubPipelineSheet
			isDone={isDone}
			name={pipelineName}
			pipelineContent={content.data}
			open={open}
			onOpenChange={setOpen}
		>
			<Box className="space-y-5 p-5 text-start">
				{isDone ? <Tick /> : <ProgressOutstanding />}
				<p className="text-text-lg font-semibold">{snakeCaseToTitleCase(pipelineName)}</p>
			</Box>
		</GithubPipelineSheet>
	);
}
