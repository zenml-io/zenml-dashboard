import { Box } from "@zenml-io/react-component-library/components/server";
import { AddServiceAccountDialog } from "./AddServiceAccount";

export default function ServiceAccountFallback() {
	return (
		<Box className="flex flex-col items-center justify-center space-y-4 p-9">
			<div className="space-y-2 text-center">
				<p className="text-display-xs font-semibold text-theme-text-primary">
					There are no service accounts yet.
				</p>
				<p className="text-theme-text-secondary">
					Create your first one now to automate your processes securely with ZenML.
				</p>
			</div>
			<AddServiceAccountDialog isFallback />
		</Box>
	);
}
