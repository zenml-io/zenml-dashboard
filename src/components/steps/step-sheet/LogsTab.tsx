import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { LogSourceOption } from "@/components/logs/log-source-combobox";
import { LogViewer2 } from "@/components/logs/logviewer-2";
import { logQueries } from "@/data/logs";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { buildInternalLogEntries } from "@/lib/logs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isError, isPending } = useStepDetail({ stepId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection ?? [];

	const sources: LogSourceOption[] = logs.map((log) => {
		return {
			value: log.id,
			label: log.body?.source ?? log.id
		};
	});

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);

	return <StepLogsTabContent sources={sources} />;
}

function StepLogsTabContent({ sources }: { sources: LogSourceOption[] }) {
	const [selectedSourceId] = useState<string>(sources[1].value);

	const stepLogs = useInfiniteQuery({
		...logQueries.logEntriesInfinite({ logsId: selectedSourceId })
	});

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data.pages.flatMap((page) => page.items ?? []));
	}, [stepLogs.data]);

	if (stepLogs.isPending) return <LoadingLogs />;

	if (stepLogs.isError) {
		return <ErrorFallback err={stepLogs.error} />;
	}

	return <LogViewer2 logs={parsedLogs} />;
}
