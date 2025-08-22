import { apiPaths, createApiPath } from "@/data/api";
import { useRunLogsDownloadToken } from "@/data/pipeline-runs/download-logs-token";
import { useToast } from "@zenml-io/react-component-library/components/client";

export function useDownloadRunLogs(runId: string, source: string) {
	const { toast } = useToast();

	const downloadUrl = createApiPath(apiPaths.runs.logsDownload(runId));
	const { mutate: getDownloadToken } = useRunLogsDownloadToken({
		onSuccess: (data) => {
			window.open(`${downloadUrl}?${new URLSearchParams({ token: data, source })}`, "_blank");
		},
		onError: (error) => {
			toast({
				status: "error",
				emphasis: "subtle",
				rounded: true,
				description: error.message
			});
		}
	});

	function handleDownload() {
		getDownloadToken({ runId, queryParams: { source } });
	}

	return { handleDownload };
}
