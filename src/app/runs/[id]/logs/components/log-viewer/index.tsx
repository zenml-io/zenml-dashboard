import { LogTab } from "@/components/runs/detail-tabs/LogTab/logs";
import { RunsDetailHeaderNameSection } from "@/components/runs/runs-detail-header-name-section";
import { StepLogsTab } from "@/components/steps/step-sheet/LogsTab";
import { SheetHeadline } from "@/components/steps/step-sheet/sheet-headline";
import { useParams } from "react-router-dom";
import { useSelectedStep } from "../use-selected-step";
import { PipelineRunLogsViewerHeader } from "./header";
import { LogViewerSidebarToggleButton } from "./sidebar-toggle-button";

type Props = {
	toggleSidebar: () => void;
};

export function PipelineRunLogsList({ toggleSidebar }: Props) {
	const params = useParams() as { runId: string };
	const { runId } = params;
	const stepId = useSelectedStep();
	return (
		<>
			<PipelineRunLogsViewerHeader>
				{stepId ? (
					<>
						<LogViewerSidebarToggleButton toggleSidebar={toggleSidebar} />
						<SheetHeadline stepId={stepId} />
					</>
				) : (
					<>
						<LogViewerSidebarToggleButton toggleSidebar={toggleSidebar} />
						<RunsDetailHeaderNameSection runId={runId} />
					</>
				)}
			</PipelineRunLogsViewerHeader>
			<div className="flex flex-1 flex-col p-5">
				{stepId ? <StepLogsTab stepId={stepId} /> : <LogTab runId={runId} />}
			</div>
		</>
	);
}
