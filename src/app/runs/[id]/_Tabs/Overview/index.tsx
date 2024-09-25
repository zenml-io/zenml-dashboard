import { AlertPanels } from "./AlertPanels";
import { Details } from "./Details";
import { OrchestratorCollapsible } from "./Orchestrator";
import { StackCollapsible } from "./Stack";

export function OverviewTab() {
	return (
		<div className="grid grid-cols-1 gap-5">
			<AlertPanels />
			<Details />
			<OrchestratorCollapsible />
			<StackCollapsible />
		</div>
	);
}
