import { apiPaths, createApiPath } from "@/data/api";
import { useArtifactVersionDownloadToken } from "@/data/artifact-versions/artifact-download-token";
import { useToast } from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";

type Props = { artifactVersionId: string };

export function DownloadArtifactButton({ artifactVersionId }: Props) {
	const { toast } = useToast();

	const downloadUrl = createApiPath(apiPaths.artifactVersions.data(artifactVersionId));
	const { mutate: getDownloadToken, isPending } = useArtifactVersionDownloadToken({
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
		getDownloadToken({ artifactVersionId });
	}

	return (
		<Button onClick={handleDownload} disabled={isPending} type="button">
			Download
		</Button>
	);
}
