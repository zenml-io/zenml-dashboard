import { apiPaths, createApiPath } from "@/data/api";
import { useSnapshotDownloadToken } from "@/data/pipeline-snapshots/download-token";
import { useToast } from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";

type Props = { snapshotId: string };

export function DownloadSnapshotCodeButton({ snapshotId }: Props) {
	const { toast } = useToast();

	const downloadUrl = createApiPath(apiPaths.pipeline_snapshots.code(snapshotId));
	const { mutate: getDownloadToken, isPending } = useSnapshotDownloadToken({
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
		getDownloadToken({ snapshotId });
	}

	return (
		<Button onClick={handleDownload} disabled={isPending} type="button">
			Download
		</Button>
	);
}
