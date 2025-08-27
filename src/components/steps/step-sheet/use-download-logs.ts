import { apiPaths, createApiPath } from "@/data/api";
import { useStepLogsDownloadToken } from "@/data/steps/download-logs-token";
import { useToast } from "@zenml-io/react-component-library/components/client";

export function useDownloadStepLogs(stepId: string) {
	const { toast } = useToast();

	const downloadUrl = createApiPath(apiPaths.steps.logsDownload(stepId));
	const { mutate: getDownloadToken } = useStepLogsDownloadToken({
		onSuccess: (data) => {
			window.open(`${downloadUrl}?${new URLSearchParams({ token: data })}`, "_blank");
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
		getDownloadToken({ stepId });
	}

	return { handleDownload };
}
