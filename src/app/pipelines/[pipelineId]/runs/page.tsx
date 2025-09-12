import { RunsSelectorContextProvider } from "../../../runs/RunsSelectorContext";
import { usePipelineDetailBreadcrumbs } from "./breadcrumb";
import { PipelineRunsContent } from "./content";

export default function PipelineDetailPage() {
	usePipelineDetailBreadcrumbs();

	return (
		<div className="space-y-5">
			<RunsSelectorContextProvider>
				<PipelineRunsContent />
			</RunsSelectorContextProvider>
		</div>
	);
}
