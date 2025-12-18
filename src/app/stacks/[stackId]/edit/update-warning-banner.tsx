import { InfoBox } from "@/components/Infobox";
import { Button } from "@zenml-io/react-component-library";
import Close from "@/assets/icons/close.svg?react";
import { useState } from "react";

export function UpdateStackWarningBanner() {
	const [isDismissed, setIsDismissed] = useState(false);

	const handleDismiss = () => {
		setIsDismissed(true);
	};

	if (isDismissed) return null;

	return (
		<div className="p-5 pb-0">
			<InfoBox
				button={
					<Button
						onClick={handleDismiss}
						intent="secondary"
						emphasis="minimal"
						size="sm"
						className="flex aspect-square size-6 items-center justify-center bg-transparent hover:bg-black/10 focus:bg-black/10 active:bg-black/20 active:ring-0"
						aria-label="Close banner"
					>
						<Close className="size-5 shrink-0 fill-current" />
					</Button>
				}
				intent="warning"
			>
				<p className="text-text-sm">You are about to update this stack. This update will:</p>
				<ul className="list-inside list-disc text-text-sm">
					<li>
						Change how historical runs display (they'll show the new configuration, not the
						original)
					</li>
					<li>Potentially break scheduled runs that depend on modified or removed components</li>
					<li>Apply immediately to all future pipeline executions</li>
				</ul>
			</InfoBox>
		</div>
	);
}
