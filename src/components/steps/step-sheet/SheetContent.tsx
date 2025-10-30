import Code from "@/assets/icons/code-browser.svg?react";
import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool.svg?react";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { TabIcon } from "@/components/tab-icon";
import { ScrollingTabsList } from "@/components/tabs/scrolling-tabs-list";
import { Tabs, TabsContent, TabsTrigger } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { StepCodeTab } from "./CodeTab";
import { StepConfigTab } from "./ConfigurationTab";
import { OrchestratorCard, StepDetailsTab } from "./DetailsTab";
import { StepLogsTab } from "./LogsTab";
import { StepMetadataTab } from "./MetadataTab";
import { StackTab } from "./StacksTab";
import { SheetHeadline } from "./sheet-headline";

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
					<ScrollingTabsList>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="overview">
							<TabIcon icon={Info} />
							<span>Overview</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="stack">
							<TabIcon icon={Stack} />
							<span>Stack</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="code">
							<TabIcon icon={Code} />
							<span>Code</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="logs">
							<TabIcon icon={Logs} />
							<span>Logs</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 truncate text-text-md" value="config">
							<TabIcon icon={Tools} />
							<span>Configuration</span>
						</TabsTrigger>
						<TabsTrigger className="flex items-center gap-2 text-text-md" value="metadata">
							<TabIcon icon={MetadataIcon} />
							<span>Metadata</span>
						</TabsTrigger>
					</ScrollingTabsList>

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
						<StepLogsTab stepId={stepId} />
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
