import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { CopyButton } from "@/components/CopyButton";
import { KeyValue } from "@/components/KeyValue";
import { NotAvailable } from "@/components/not-available";
import { Deployment } from "@/types/deployments";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

export function EndpointCollapsible() {
	return <DeploymentDetailWrapper Component={EndpointCollapsibleContent} />;
}

type Props = {
	deployment: Deployment;
};

function EndpointCollapsibleContent({ deployment }: Props) {
	const [open, setOpen] = useState(true);

	const deploymentEndpoint = deployment.body?.url;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Endpoint
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue
						label="Endpoint"
						value={
							deploymentEndpoint ? (
								<div className="group/copybutton flex items-center gap-0.5">
									<a
										className="link"
										href={deploymentEndpoint}
										target="_blank"
										rel="noopener noreferrer"
									>
										{deploymentEndpoint}
									</a>
									<CopyButton copyText={deploymentEndpoint} />
								</div>
							) : (
								<NotAvailable />
							)
						}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
