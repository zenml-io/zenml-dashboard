import DoubleChevronRight from "@/assets/icons/chevron-right-double.svg?react";
import Code from "@/assets/icons/code-browser.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { ExecutionStatus } from "@/types/pipeline-runs";
import {
	Badge,
	BadgeProps,
	SheetClose,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { ExecutionStatusIcon, getExecutionStatusBackgroundColor } from "../../ExecutionStatus";
import { StepCodeTab } from "./CodeTab";
import { StepConfigTab } from "./ConfigurationTab";
import { StepDetailsTab } from "./DetailsTab";
import { StepLogsTab } from "./LogsTab";
import { StackCollapsible } from "@/app/runs/[id]/_Tabs/Overview/Stack";
import Logs from "@/assets/icons/logs.svg?react";

type Props = {
	stepId: string;
};

function getBadgeColor(status?: ExecutionStatus): BadgeProps["color"] {
	if (!status) return "light-grey";
	switch (status) {
		case "completed":
			return "green";
		default:
			return "light-grey";
	}
}

export function StepSheetContent({ stepId }: Props) {
	const { runId } = useParams() as { runId: string };
	const { data } = useStepDetail({
		stepId: stepId
	});

	const status = data?.body?.status;
	const enable_cache = data?.metadata?.config?.enable_cache;

	return (
		<div>
			<div className="flex h-9 items-center border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-3">
				<SheetClose className="focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
					<DoubleChevronRight className="h-5 w-5 fill-neutral-500" />
					<span className="sr-only">Close</span>
				</SheetClose>
			</div>
			<div className="flex justify-between border-b border-theme-border-moderate bg-theme-surface-primary p-5">
				<div>
					{data ? (
						<div className="flex items-center gap-1">
							<div className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(status)}`}>
								<ExecutionStatusIcon status={status} className="h-4 w-4" />
							</div>
							<h2 className="text-display-xs font-semibold">{data.name}</h2>
							<Badge size="sm" color={getBadgeColor(status)}>
								{status || "None"}
							</Badge>
							{typeof enable_cache === "boolean" && (
								<Badge size="sm" color={enable_cache ? "green" : "grey"}>
									{enable_cache ? "Enable cache" : "Disabled cache"}
								</Badge>
							)}
						</div>
					) : (
						<Skeleton className="h-6 w-7" />
					)}
				</div>
			</div>
			<div className="p-5">
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="overview">
							<Info className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Overview</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="code">
							<Code className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Code</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="logs">
							<Logs className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Logs</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="config">
							<Tools className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Configuration</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="overview">
						<StepDetailsTab runId={runId} stepId={stepId} />
						<div className="mt-5">
							<StackCollapsible />
						</div>
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="code">
						<StepCodeTab stepId={stepId} />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="logs">
						<StepLogsTab stepId={stepId} stepDetail={data} />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="config">
						<StepConfigTab stepId={stepId} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
