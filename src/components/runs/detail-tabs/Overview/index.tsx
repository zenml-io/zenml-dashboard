import { AlertPanels } from "./AlertPanels";
import { Details } from "./Details";
import { OrchestratorCollapsible } from "./Orchestrator";
type Props = {
	runId: string;
};

export function OverviewTab({ runId }: Props) {
	return (
		<div className="grid grid-cols-1 gap-5">
			<AlertPanels runId={runId} />
			<Details runId={runId} />
			<OrchestratorCollapsible runId={runId} />
		</div>
	);
}
