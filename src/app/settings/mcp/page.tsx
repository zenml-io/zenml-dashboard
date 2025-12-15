import { useState } from "react";
import { Box } from "@zenml-io/react-component-library/components/server";
import { TokenSection } from "./components/TokenSection";
import { ClientConfigSection } from "./components/ClientConfigSection";
import { ConfigurationUpdatedBanner } from "./components/ConfigurationUpdatedBanner";

export default function MCPSettingsPage() {
	const [token, setToken] = useState<string | null>(null);
	const [showBanner, setShowBanner] = useState(false);

	const handleTokenChange = (value: string | null) => {
		setToken(value);
		setShowBanner(Boolean(value));
	};

	const endpointUrl = window.location.origin;

	return (
		<Box className="space-y-5 p-5">
			<div className="space-y-2">
				<h1 className="text-text-xl font-semibold">MCP</h1>
				<p className="text-text-sm text-theme-text-secondary">
					Model Context Protocol settings for connecting IDEs and AI assistants to your ZenML
					Server.
				</p>
			</div>

			<TokenSection token={token} onTokenChange={handleTokenChange} />

			{showBanner && token ? (
				<ConfigurationUpdatedBanner onDismiss={() => setShowBanner(false)} />
			) : null}

			<div className="border-t border-theme-border-moderate" />

			<ClientConfigSection endpointUrl={endpointUrl} token={token || "your_api_key_here"} />
		</Box>
	);
}
