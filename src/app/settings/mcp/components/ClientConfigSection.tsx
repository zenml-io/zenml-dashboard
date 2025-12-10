import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent
} from "@zenml-io/react-component-library/components/client";
import { getIDEConfigs } from "../config/ide-configs";
import { IDETabContent } from "./IDETabContent";

function isSafeDeepLinkUrl(rawUrl: string): boolean {
	if (!rawUrl) {
		return false;
	}

	try {
		const url = new URL(rawUrl);

		if (url.protocol === "javascript:") {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}

type ClientConfigSectionProps = {
	endpointUrl: string;
	token: string;
	projectId?: string;
};

export function ClientConfigSection({ endpointUrl, token, projectId }: ClientConfigSectionProps) {
	const ideConfigs = getIDEConfigs(endpointUrl, token, projectId);

	const handleOpenLink = (url: string) => {
		if (!isSafeDeepLinkUrl(url)) {
			return;
		}

		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<h2 className="text-text-md font-semibold">Client Configuration</h2>
					<a
						href="https://docs.zenml.io/user-guides/best-practices/mcp-chat-with-server"
						target="_blank"
						rel="noreferrer noopener"
						className="text-text-sm text-primary-400 hover:text-primary-500"
					>
						Learn More
					</a>
				</div>
				<p className="text-text-sm text-theme-text-secondary">
					Choose your IDE or AI assistant and follow the installation instructions below.
				</p>
			</div>

			<div className="flex flex-col rounded-md border border-theme-border-moderate">
				<Tabs defaultValue="vscode" className="w-full">
					<TabsList className="grid w-full grid-cols-6">
						{ideConfigs.map((ide) => (
							<TabsTrigger key={ide.value} value={ide.value} className="text-text-sm">
								{ide.name}
							</TabsTrigger>
						))}
					</TabsList>

					{ideConfigs.map((ide) => (
						<TabsContent key={ide.value} value={ide.value} className="mt-0 border-0 p-5">
							<IDETabContent ide={ide} onOpenLink={handleOpenLink} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
