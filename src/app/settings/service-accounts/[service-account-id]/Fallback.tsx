import { Box } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";
import { AddApiKeyDialog } from "./AddApiKeyDialog";

export default function ApiKeyFallback() {
	const { serviceAccountId } = useParams() as { serviceAccountId: string };

	return (
		<Box className="flex flex-col items-center justify-center space-y-4 p-9">
			<div className="space-y-2 text-center">
				<p className="text-display-xs font-semibold text-theme-text-primary">
					This service account doesn't have any API Keys yet
				</p>
				<p className="text-theme-text-secondary">
					Generate your first API Key to enable secure interactions with the ZenML Server.
				</p>
			</div>
			<AddApiKeyDialog isFallback serviceAccountId={serviceAccountId} />
		</Box>
	);
}
