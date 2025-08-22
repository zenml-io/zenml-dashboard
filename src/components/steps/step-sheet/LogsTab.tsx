import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { useLogViewerContext } from "@/components/logs/logviewer-context";
import { useStepLogs } from "@/data/steps/step-logs-query";
import { keepPreviousData } from "@tanstack/react-query";
import { ErrorFallback } from "../../Error";
import { useDownloadStepLogs } from "./use-download-logs";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { logLevel, searchQuery, currentPage } = useLogViewerContext();
	const { handleDownload } = useDownloadStepLogs(stepId);
	const { data, isPending, isError, error, isFetching, isPlaceholderData } = useStepLogs(
		{
			stepId,
			queries: { level: logLevel, search: searchQuery, page: currentPage }
		},
		{ placeholderData: keepPreviousData }
	);

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (isPending) {
		return <LoadingLogs />;
	}

	return (
		<div className="space-y-5">
			<EnhancedLogsViewer
				handleDownload={handleDownload}
				logPage={data}
				isLoading={isFetching && isPlaceholderData}
			/>
		</div>
	);
}
