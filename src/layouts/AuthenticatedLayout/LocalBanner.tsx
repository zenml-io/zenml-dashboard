import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { Button } from "@zenml-io/react-component-library";

export function LocalBanner() {
	const serverInfo = useServerInfo();

	if (!checkIsLocalServer(serverInfo.data?.deployment_type || "other")) return null;

	return (
		<aside className="flex h-9 items-center justify-between gap-2 bg-warning-400 px-4 py-3">
			<div className="flex items-center gap-3 truncate">
				<ZenMLIcon className="h-5 w-5 shrink-0" />
				<p className="font-semibold">You are running a local version of ZenML.</p>
				<p className="truncate">
					<a
						target="_blank"
						href="https://docs.zenml.io/deploying-zenml/deploying-zenml"
						rel="noopener noreferrer"
						className="link"
					>
						Deploy remotely
					</a>{" "}
					for full features or explore ZenML Pro's enhanced deployment and support.
				</p>
			</div>
			<Button
				asChild
				intent="secondary"
				className="whitespace-nowrap bg-theme-surface-primary"
				size="md"
			>
				<a href="https://zenml.io/book-your-demo" rel="noopener noreferrer" target="_blank">
					Book a demo
				</a>
			</Button>
		</aside>
	);
}
