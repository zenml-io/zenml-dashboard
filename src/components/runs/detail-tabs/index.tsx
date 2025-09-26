import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import { TabIcon } from "@/components/tab-icon";
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
					<TabIcon icon={Info} />
					<span>Overview</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="stack">
					<TabIcon icon={Stack} />
					<span>Stack</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="logs">
					<TabIcon icon={Logs} />
					<span>Logs</span>
				</TabsTrigger>
				<TabsTrigger
					className="flex items-center gap-2 truncate text-text-md"
					value="configuration"
				>
					<TabIcon icon={Tools} />
					<span>Configuration</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="metadata">
					<TabIcon icon={MetadataIcon} />
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
