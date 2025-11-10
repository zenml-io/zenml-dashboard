import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { Deployment } from "@/types/deployments";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeploymentDetailWrapper } from "./fetch-wrapper";
import {
	buildCurl,
	buildPythonCommand,
	buildTs,
	buildZenCommand,
	replaceAuthTokenPlaceholder
} from "./command-builder";
import { useQuery } from "@tanstack/react-query";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { JSONSchema } from "@/types/forms";
import { JSONSchemaFaker } from "@/lib/json-faker";

export function DeploymentCodeCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentCodeContent} />;
}

type Props = {
	deployment: Deployment;
};

function DeploymentCodeContent({ deployment }: Props) {
	const [open, setOpen] = useState(true);
	const [selectedTab, setSelectedTab] = useState("cli");

	const snapshotId = deployment.resources?.snapshot?.id;

	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId!),
		enabled: !!snapshotId
	});

	if (!snapshotId) return null;
	if (snapshotQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (snapshotQuery.isError) return null;
	const snapshot = snapshotQuery.data;

	const schema = snapshot.metadata?.pipeline_spec?.input_schema as JSONSchema;

	const defaultBody = schema ? JSONSchemaFaker.generate(schema) : {};

	const url = deployment.body?.url;

	const authKey = deployment.metadata?.auth_key ?? undefined;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex h-9 items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Invocation
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
						{!!url && (
							<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="curl">
								<span>cURL</span>
							</TabsTrigger>
						)}
						{!!url && (
							<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="ts">
								<span>Typescript</span>
							</TabsTrigger>
						)}
					</TabsList>

					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="cli">
						<Codesnippet
							fullWidth
							highlightCode
							language="bash"
							wrap
							code={buildZenCommand(deployment.name, defaultBody)}
						/>
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="python">
						<Codesnippet
							fullWidth
							highlightCode
							language="python"
							wrap
							code={buildPythonCommand({
								deploymentId: deployment.id,
								defaultBody: defaultBody
							})}
						/>
					</TabsContent>
					{!!url && (
						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="curl">
							{(() => {
								const curlCode = buildCurl(url, defaultBody, authKey);
								return (
									<Codesnippet
										fullWidth
										highlightCode
										wrap
										language="bash"
										copyCode={replaceAuthTokenPlaceholder(curlCode, authKey)}
										code={curlCode}
									/>
								);
							})()}
						</TabsContent>
					)}
					{!!url && (
						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="ts">
							{(() => {
								const tsCode = buildTs(url, defaultBody, authKey);
								return (
									<Codesnippet
										fullWidth
										wrap
										highlightCode
										language="ts"
										copyCode={replaceAuthTokenPlaceholder(tsCode, authKey)}
										code={tsCode}
									/>
								);
							})()}
						</TabsContent>
					)}
				</Tabs>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
