import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { Deployment } from "@/types/deployments";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeploymentDetailWrapper } from "./fetch-wrapper";
import { buildCurl, buildPythonCommand, buildZenCommand } from "./command-builder";

export function DeploymentCodeCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentCodeContent} />;
}

type Props = {
	deployment: Deployment;
};

function DeploymentCodeContent({ deployment }: Props) {
	const [open, setOpen] = useState(true);
	const [selectedTab, setSelectedTab] = useState("cli");
	const url = deployment.body?.url;

	const displayCurl = !!url;

	const authKey = deployment.metadata?.auth_key ?? undefined;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Endpoint
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<Tabs value={selectedTab} onValueChange={setSelectedTab}>
					<TabsList>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="cli">
							<span>CLI</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="python">
							<span>Python</span>
						</TabsTrigger>
						{displayCurl && (
							<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="curl">
								<span>cUrl</span>
							</TabsTrigger>
						)}
					</TabsList>

					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="cli">
						<Codesnippet
							fullWidth
							highlightCode
							wrap
							code={buildZenCommand(deployment.name, { city: "Paris", test: 20 })}
						/>
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="python">
						<Codesnippet
							fullWidth
							highlightCode
							wrap
							code={buildPythonCommand({
								deploymentId: deployment.id,
								defaultBody: { city: "Paris", test: 20 }
							})}
						/>
					</TabsContent>
					{displayCurl && (
						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="curl">
							<Codesnippet
								fullWidth
								wrap
								code={buildCurl(
									url,
									{
										city: "Paris"
									},
									authKey
								)}
							/>
						</TabsContent>
					)}
				</Tabs>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
