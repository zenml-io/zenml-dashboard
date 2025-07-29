import { useState } from "react";
import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import Close from "@/assets/icons/close.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { Button } from "@zenml-io/react-component-library";

const LOCAL_BANNER_DISMISSED_KEY = "zenml-local-banner-dismissed";

export function LocalBanner() {
	const serverInfo = useServerInfo();
	const [isDismissed, setIsDismissed] = useState(() => {
		return sessionStorage.getItem(LOCAL_BANNER_DISMISSED_KEY) === "true";
	});

	if (!checkIsLocalServer(serverInfo.data?.deployment_type || "other") || isDismissed) {
		return null;
	}

	const handleDismiss = () => {
		setIsDismissed(true);
		sessionStorage.setItem(LOCAL_BANNER_DISMISSED_KEY, "true");
	};

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
			<div className="flex items-center gap-2">
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
				<Button
					onClick={handleDismiss}
					intent="secondary"
					emphasis="minimal"
					size="sm"
					className="flex aspect-square size-6 items-center justify-center bg-transparent hover:bg-black/10 focus:bg-black/10 active:bg-black/20 active:ring-0"
					aria-label="Close banner"
				>
					<Close className="h-4 w-4" />
				</Button>
			</div>
		</aside>
	);
}
