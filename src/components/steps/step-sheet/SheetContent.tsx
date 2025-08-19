import Code from "@/assets/icons/code-browser.svg?react";
import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { StepCodeTab } from "./CodeTab";
import { StepConfigTab } from "./ConfigurationTab";
import { OrchestratorCard, StepDetailsTab } from "./DetailsTab";
import { StepLogsTab } from "./LogsTab";
import { StepMetadataTab } from "./MetadataTab";
import { StackTab } from "./StacksTab";
import { SheetHeadline } from "./sheet-headline";
import { LogViewerProvider } from "@/components/logs/logviewer-context";

type Props = {
	stepId: string;
};

export function StepSheetContent({ stepId }: Props) {
	const { runId } = useParams() as { runId: string };

	return (
		<div>
			<SheetHeader />
			<div className="flex justify-between border-b border-theme-border-moderate bg-theme-surface-primary p-5">
				<SheetHeadline stepId={stepId} />
			</div>
			<div className="p-5">
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="overview">
							<Info className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Overview</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="stack">
							<Stack className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Stack</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="code">
							<Code className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Code</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="logs">
							<Logs className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Logs</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="config">
							<Tools className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Configuration</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 text-text-md" value="metadata">
							<MetadataIcon className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
							<span>Metadata</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent className="m-0 mt-5 space-y-5 border-0 bg-transparent p-0" value="overview">
						<StepDetailsTab runId={runId} stepId={stepId} />
						<OrchestratorCard />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stack">
						<StackTab stepId={stepId} />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="code">
						<StepCodeTab stepId={stepId} />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="logs">
						<LogViewerProvider>
							<StepLogsTab stepId={stepId} />
						</LogViewerProvider>
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="config">
						<StepConfigTab stepId={stepId} />
					</TabsContent>
					<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="metadata">
						<StepMetadataTab stepId={stepId} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
