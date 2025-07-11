import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Collapse from "@/assets/icons/collapse.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import {
	Button,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigurationTab } from "./Configuration";
import { MetadataTab } from "./Metadata";
import { OverviewTab } from "./Overview";
import { useSelectedTab } from "./service";
import { StackTab } from "./Stack";
import { LogTab } from "./LogTab/logs";
import { ErrorBoundary } from "react-error-boundary";
import { LogsTabBoundary } from "./LogTab/boundary";

type TabsHeaderProps = {
	setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};
export function TabsHeader({ setIsPanelOpen }: TabsHeaderProps) {
	return (
		<div className="flex items-center gap-4 border-b border-theme-border-moderate bg-theme-surface-primary px-5 py-4">
			<Button
				className="flex h-6 w-6 items-center justify-center bg-transparent p-0.5"
				intent="secondary"
				onClick={() => setIsPanelOpen(false)}
			>
				<Collapse className="h-5 w-5 fill-theme-text-secondary" />
			</Button>
			<span className="text-text-xl">Run Insights</span>
		</div>
	);
}

export function RunsDetailTabs() {
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();

	function handleTabChage(tab: string) {
		const current = new URLSearchParams();
		current.set("tab", tab);
		navigate(`?${current.toString()}`);
	}

	return (
		<div className="flex flex-col gap-5 p-5">
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
					<OverviewTab />
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stack">
					<StackTab />
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="logs">
					<ErrorBoundary fallbackRender={LogsTabBoundary}>
						<LogTab />
					</ErrorBoundary>
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="configuration">
					<ConfigurationTab />
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="metadata">
					<MetadataTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
