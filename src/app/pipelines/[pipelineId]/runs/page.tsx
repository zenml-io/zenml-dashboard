import { RunsSelectorContextProvider } from "../../../runs/RunsSelectorContext";
import { usePipelineDetailBreadcrumbs } from "./breadcrumb";
import { PipelineRunsTable } from "./RunsTable";

export default function PipelineDetailPage() {
	usePipelineDetailBreadcrumbs();

	return (
		<div>
			<RunsSelectorContextProvider>
				<PipelineRunsTable />
			</RunsSelectorContextProvider>
		</div>
	);
}
