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

	const stepLogs = useStepLogs({ stepId, queries: { source: selectedSource } });

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data);
	}, [stepLogs.data]);

	if (stepLogs.isPending) return <LoadingLogs />;

	if (stepLogs.isError) {
		return <ErrorFallback err={stepLogs.error} />;
	}

	return (
		<EnhancedLogsViewer
			fallbackMessage={
				<EmptyStateLogs
					title="This step has no logs"
					subtitle="It looks like there are no logs associated with this step"
				/>
			}
			sourceSwitcher={
				sources.length > 1 ? (
					<div className="space-y-0.5">
						<span className="text-text-sm text-theme-text-secondary">Source</span>
						<LogSourceCombobox
							sources={sources}
							selectedSource={selectedSource}
							setSelectedSource={setSelectedSource}
						/>
					</div>
				) : undefined
			}
			logs={parsedLogs}
			reloadLogs={() => stepLogs.refetch()}
		/>
	);
}
