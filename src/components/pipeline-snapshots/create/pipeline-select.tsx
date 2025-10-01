import { pipelineQueries } from "@/data/pipelines";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { Controller, useFormContext } from "react-hook-form";
import { CreatePipelineSnapshotFormSchema } from "./form-schema";
import { Pipeline } from "@/types/pipelines";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";

type Props = {
	pipeline?: Pipeline;
};

export function PipelineSelect({ pipeline }: Props) {
	const { control } = useFormContext<CreatePipelineSnapshotFormSchema>();
	const pipelineQuery = useQuery({
		...pipelineQueries.pipelineList({ sort_by: "desc:latest_run" }),
		throwOnError: true
	});

	if (pipelineQuery.isPending) {
		return <Skeleton className="h-[36px] w-[300px]" />;
	}

	if (pipelineQuery.isError) {
		return <p>Error fetching pipelines</p>;
	}
	return (
		<Controller
			control={control}
			name="pipeline"
			render={({ field: { onChange, ...rest } }) => (
				<Select disabled={!!pipeline} {...rest} onValueChange={onChange}>
					<SelectTrigger className="border border-theme-border-moderate data-[error=true]:border-error-500">
						<span className="truncate">
							<SelectValue placeholder="Select a pipeline" />
						</span>
					</SelectTrigger>
					<SelectContent>
						{pipeline && <SelectItem value={pipeline.id}>{pipeline.name}</SelectItem>}
						{!pipeline &&
							pipelineQuery.data.items.map((pipeline) => (
								<SelectItem key={pipeline.id} value={pipeline.id}>
									{pipeline.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
			)}
		/>
	);
}
