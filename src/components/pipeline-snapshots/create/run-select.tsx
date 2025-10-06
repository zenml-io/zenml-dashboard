import RunIcon from "@/assets/icons/terminal.svg?react";
import { getExecutionStatusColor } from "@/components/ExecutionStatus";
import { allPipelineRunsInfinite } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { ExecutionStatus, PipelineRun } from "@/types/pipeline-runs";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	ScrollArea,
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
	const runQuery = useInfiniteQuery({
		...allPipelineRunsInfinite({
			params: { pipeline_id: pipeline, sort_by: "desc:created" }
		})
	});

	if (runQuery.isPending) {
		return <Skeleton className="h-7 w-[300px]" />;
	}

	if (runQuery.isError) {
		return <p>Error fetching runs</p>;
	}

	const runs = runQuery.data?.pages.flatMap((page) => page.items);

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
							const item = runs.find((item) => item.id === val);
							if (item) {
								setValue("name", generateSnapshotName(item.name));
							}
						}
						onChange(val);
					}}
				>
					<SelectTrigger
						ref={ref}
						className="border border-theme-border-moderate text-text-md disabled:bg-neutral-100 data-[error=true]:border-error-500"
					>
						<div className="truncate">
							<SelectValue placeholder="Select a run" />
						</div>
					</SelectTrigger>
					<SelectContent>
						<div className="space-y-1">
							<ScrollArea viewportClassName="max-h-[300px]">
								{run && (
									<SelectItem value={run.id}>
										<RunSelectItemContent name={run.name} status={run.body?.status ?? null} />
									</SelectItem>
								)}
								{!run &&
									runs.map((run) => (
										<SelectItem key={run.id} value={run.id}>
											<RunSelectItemContent name={run.name} status={run.body?.status ?? null} />
										</SelectItem>
									))}
							</ScrollArea>
							{runQuery.hasNextPage && (
								<>
									<div className="h-[1px] fill-theme-border-moderate"></div>
									<button
										type="button"
										onClick={() => runQuery.fetchNextPage()}
										className="flex w-full rounded-sm bg-theme-surface-primary px-2 py-1 hover:bg-theme-surface-tertiary"
									>
										<div className="flex items-center gap-1">
											{runQuery.isFetchingNextPage && (
												<div
													role="alert"
													aria-busy="true"
													className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
												></div>
											)}
											Load more
										</div>
									</button>
								</>
							)}
						</div>
					</SelectContent>
				</Select>
			)}
		/>
	);
}

function RunSelectItemContent({ name, status }: { name: string; status: ExecutionStatus | null }) {
	return (
		<div className="flex items-center gap-1 text-text-md">
			<RunIcon className={`h-4 w-4 shrink-0 ${getExecutionStatusColor(status)}`} />
			<div className="truncate">{name}</div>
		</div>
	);
}
