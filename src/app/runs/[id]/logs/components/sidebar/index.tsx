import { PipelineRunLogsSidebarRunItem } from "./run-section";
import { PipelineRunLogsSidebarStepList } from "./step-section";

export function PipelineRunLogsSidebar() {
	return (
		<div className="flex h-full flex-col bg-theme-surface-primary pt-5">
			{/* Run Header */}
			<div className="px-3">
				<h3 className="mb-2 text-text-xs font-semibold text-theme-text-tertiary">RUN</h3>
				<PipelineRunLogsSidebarRunItem />
			</div>

			{/* Steps Section */}
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="px-4 py-3">
					<h3 className="text-text-xs font-semibold text-theme-text-tertiary">STEPS</h3>
				</div>
				<PipelineRunLogsSidebarStepList />
			</div>
		</div>
	);
}
