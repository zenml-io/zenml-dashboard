import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { LogSourceCombobox } from "@/components/logs/log-source-combobox";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { useStepLogs } from "@/data/steps/step-logs-query";
import { buildInternalLogEntries } from "@/lib/logs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isError, isPending } = useStepDetail({ stepId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection;

	const sources =
		logs
			?.map((log) => log.body?.source)
			.filter((source): source is string => source != null && source !== undefined) ?? [];

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);

	return <StepLogsTabContent sources={sources} stepId={stepId} />;
}

function StepLogsTabContent({ sources, stepId }: { sources: string[]; stepId: string }) {
	const defaultSource = sources.includes("step") ? "step" : sources[0];
	const [selectedSource, setSelectedSource] = useState<string>(defaultSource);
	return (
		<section className="space-y-5">
			{sources.length > 0 && (
				<div className="flex items-center gap-2">
					<span className="text-theme-text-secondary">Logs source:</span>
					{sources.length > 1 ? (
						<LogSourceCombobox
							sources={sources}
							selectedSource={selectedSource}
							setSelectedSource={setSelectedSource}
						/>
					) : (
						<span className="font-semibold capitalize">{selectedSource}</span>
					)}
				</div>
			)}
			<StepLogDisplay selectedSource={selectedSource} stepId={stepId} />
		</section>
	);
}

type StepLogDisplayProps = {
	selectedSource: string;
	stepId: string;
};

function StepLogDisplay({ selectedSource, stepId }: StepLogDisplayProps) {
	const stepLogs = useStepLogs({ stepId, queries: { source: selectedSource } });

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data);
	}, [stepLogs.data]);

	if (stepLogs.isPending) return <LoadingLogs />;

	if (stepLogs.isError) {
		return <ErrorFallback err={stepLogs.error} />;
	}

	const logs = stepLogs.data;
	if (logs.length === 0) {
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);
	}

	return (
		<div className="h-full w-full">
			<EnhancedLogsViewer logs={parsedLogs} reloadLogs={() => stepLogs.refetch()} />
		</div>
	);
}
