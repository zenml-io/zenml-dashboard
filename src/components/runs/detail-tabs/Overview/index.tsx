import { AlertPanels } from "./AlertPanels";
import { Details } from "./Details";
import { OrchestratorCollapsible } from "./Orchestrator";
import { ProgressCollapsible } from "./Progress";
import { ScheduleCollapsible } from "./schedule";
import { WaitConditionCollapsible } from "./wait-condition-collapsible";
type Props = {
	runId: string;
};

export function OverviewTab({ runId }: Props) {
	return (
		<div className="grid grid-cols-1 gap-5">
			<AlertPanels runId={runId} />
			<WaitConditionCollapsible runId={runId} />
			<ProgressCollapsible runId={runId} />
			<Details runId={runId} />
			<OrchestratorCollapsible runId={runId} />
			<ScheduleCollapsible runId={runId} />
		</div>
	);
}
