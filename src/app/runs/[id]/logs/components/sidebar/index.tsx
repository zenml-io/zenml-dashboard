import { useState } from "react";
import { PipelineRunLogsSidebarRunItem } from "./run-section";
import { PipelineRunLogsSidebarStepList } from "./step-section";
import { PipelineRunLogsSidebarSearchSection } from "./search-section";
import { StatusFilter } from "./common-types";

export function PipelineRunLogsSidebar() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
	return (
		<div className="flex h-full flex-col bg-theme-surface-primary pt-5">
			<div className="mb-3 px-3">
				<PipelineRunLogsSidebarSearchSection
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
			</div>
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
				<PipelineRunLogsSidebarStepList statusFilter={statusFilter} searchTerm={searchTerm} />
			</div>
		</div>
	);
}
