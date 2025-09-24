import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { ErrorBoundary } from "react-error-boundary";
import { ConfigurationTab } from "./Configuration";
import { LogsTabBoundary } from "./LogTab/boundary";
import { LogTab } from "./LogTab/logs";
import { MetadataTab } from "./Metadata";
import { OverviewTab } from "./Overview";
import { StackTab } from "./Stack";

type RunDetailTabsDisplayProps = {
	runId: string;
	selectedTab: string;
	handleTabChage: (tab: string) => void;
};
export function RunDetailTabsDisplay({
	runId,
	selectedTab,
	handleTabChage
}: RunDetailTabsDisplayProps) {
	return (
		<Tabs value={selectedTab} onValueChange={handleTabChage}>
			<TabsList>
				<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="overview">
					<Info className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Overview</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="stack">
					<Stack className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Stack</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="logs">
					<Logs className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Logs</span>
				</TabsTrigger>
				<TabsTrigger
					className="flex items-center gap-2 truncate text-text-md"
					value="configuration"
				>
					<Tools className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Configuration</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="metadata">
					<MetadataIcon className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Metadata</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="overview">
				<OverviewTab runId={runId} />
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stack">
				<StackTab runId={runId} />
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="logs">
				<ErrorBoundary fallbackRender={LogsTabBoundary}>
					<LogTab runId={runId} />
				</ErrorBoundary>
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="configuration">
				<ConfigurationTab runId={runId} />
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="metadata">
				<MetadataTab runId={runId} />
			</TabsContent>
		</Tabs>
	);
}
