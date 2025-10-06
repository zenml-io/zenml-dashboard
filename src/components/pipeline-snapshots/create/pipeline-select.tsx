import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import { pipelineQueries } from "@/data/pipelines";
import { Pipeline } from "@/types/pipelines";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { Controller, useFormContext } from "react-hook-form";
import { CreatePipelineSnapshotFormSchema } from "./form-schema";

type Props = {
	pipeline?: Pipeline;
};

export function PipelineSelect({ pipeline }: Props) {
	const { control, resetField } = useFormContext<CreatePipelineSnapshotFormSchema>();
	const pipelineQuery = useInfiniteQuery({
		...pipelineQueries.pipelineListInfinite({ sort_by: "desc:latest_run" }),
		throwOnError: true
	});

	if (pipelineQuery.isPending) {
		return <Skeleton className="h-7 w-[300px]" />;
	}

	if (pipelineQuery.isError) {
		return <p>Error fetching pipelines</p>;
	}

	const pipelines = pipelineQuery.data?.pages.flatMap((page) => page.items);

	return (
		<Controller
			control={control}
			name="pipeline"
			render={({ field: { onChange, ref, ...rest } }) => (
				<Select
					disabled={!!pipeline}
					{...rest}
					onValueChange={(val) => {
						resetField("run");
						onChange(val);
					}}
				>
					<SelectTrigger
						ref={ref}
						className="border border-theme-border-moderate text-text-md disabled:bg-neutral-100 data-[error=true]:border-error-500"
					>
						<div className="truncate">
							<SelectValue placeholder="Select a pipeline" />
						</div>
					</SelectTrigger>
					<SelectContent>
						<div className="space-y-1">
							<ScrollArea viewportClassName="max-h-[300px]">
								{pipeline && (
									<SelectItem
										className="flex items-center gap-1"
										key={pipeline.id}
										value={pipeline.id}
									>
										<SelectItemContent name={pipeline.name} />
									</SelectItem>
								)}
								{!pipeline &&
									pipelines.map((pipeline) => (
										<SelectItem key={pipeline.id} value={pipeline.id}>
											<SelectItemContent name={pipeline.name} />
										</SelectItem>
									))}
							</ScrollArea>

							{pipelineQuery.hasNextPage && (
								<>
									<div className="h-[1px] fill-theme-border-moderate"></div>
									<button
										onClick={() => pipelineQuery.fetchNextPage()}
										className="flex w-full rounded-sm bg-theme-surface-primary px-2 py-1 hover:bg-theme-surface-tertiary"
									>
										<div className="flex items-center gap-1">
											{pipelineQuery.isFetchingNextPage && (
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

function SelectItemContent({ name }: { name: string }) {
	return (
		<div className="flex items-center gap-1 text-text-md">
			<PipelineIcon className="size-4 shrink-0 fill-primary-400" />
			<div className="truncate">{name}</div>
		</div>
	);
}
