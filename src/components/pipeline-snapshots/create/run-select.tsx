import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { PipelineRun } from "@/types/pipeline-runs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Skeleton
} from "@zenml-io/react-component-library";
import { Controller, useFormContext } from "react-hook-form";
import { CreatePipelineSnapshotFormSchema } from "./form-schema";
import { generateSnapshotName } from "./name-helper";

type Props = {
	run?: PipelineRun;
};

export function RunSelect({ run }: Props) {
	const { watch, control, setValue, getValues } =
		useFormContext<CreatePipelineSnapshotFormSchema>();

	const pipeline = watch("pipeline");
	const runQuery = useAllPipelineRuns({
		params: {
			pipeline: pipeline,
			sort_by: "desc:created"
		}
	});

	if (runQuery.isPending) {
		return <Skeleton className="h-[36px] w-[300px]" />;
	}

	if (runQuery.isError) {
		return <p>Error fetching runs</p>;
	}

	return (
		<Controller
			control={control}
			name="run"
			render={({ field: { onChange, ref, ...rest } }) => (
				<Select
					disabled={!!run || !pipeline}
					{...rest}
					onValueChange={(val) => {
						if (!getValues("name")) {
							const item = runQuery.data.items.find((item) => item.id === val);
							if (item) {
								setValue("name", generateSnapshotName(item.name));
							}
						}
						onChange(val);
					}}
				>
					<SelectTrigger
						ref={ref}
						className="border border-theme-border-moderate data-[error=true]:border-error-500"
					>
						<span className="truncate">
							<SelectValue placeholder="Select a run" />
						</span>
					</SelectTrigger>
					<SelectContent>
						{run && <SelectItem value={run.id}>{run.name}</SelectItem>}
						{!run &&
							runQuery.data.items.map((run) => (
								<SelectItem key={run.id} value={run.id}>
									{run.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
			)}
		/>
	);
}
