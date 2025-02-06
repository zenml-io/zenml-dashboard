import { Box } from "@zenml-io/react-component-library/components/server";
import { CreateTokenButton } from "./CreateTokenButton";

export default function ApiTokensPage() {
	return (
		<Box className="flex flex-col gap-5 p-5">
			<h1 className="text-text-xl font-semibold">API Tokens</h1>
			<div className="flex items-center justify-end">
				<CreateTokenButton size="sm" />
			</div>
			<Box className="flex w-full flex-col items-center justify-center space-y-5 p-9 text-center">
				<div className="space-y-2">
					<h2 className="text-display-xs font-semibold">Create a new API Token</h2>
					<p className="text-text-xl text-theme-text-secondary">
						Generate a temporary access key for quick, secure automation tasks in your Tenant. An
						API Token is temporary (max. 1 hour) and won't be stored anywhere.
					</p>
				</div>
				<CreateTokenButton size="md" />
			</Box>
		</Box>
	);
}
