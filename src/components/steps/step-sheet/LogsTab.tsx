import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { useStepLogs } from "@/data/steps/step-logs-query";
import { ErrorFallback } from "../../Error";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepLogs({ stepId });

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (isPending) {
		return <LoadingLogs />;
	}

	return (
		<div className="space-y-5">
			<EnhancedLogsViewer logPage={data} />
		</div>
	);
}
