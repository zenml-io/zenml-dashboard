import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { useStepLogs } from "@/data/steps/step-logs-query";
import { buildInternalLogEntries } from "@/lib/logs";
import { useMemo } from "react";
import { ErrorFallback } from "../../Error";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepLogs({ stepId });

	const parsedLogs = useMemo(() => {
		if (!data) return [];
		return buildInternalLogEntries(data);
	}, [data]);

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (isPending) {
		return <LoadingLogs />;
	}

	if (parsedLogs.length === 0) {
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);
	}

	return (
		<div className="space-y-5">
			<EnhancedLogsViewer logs={parsedLogs} />
		</div>
	);
}
