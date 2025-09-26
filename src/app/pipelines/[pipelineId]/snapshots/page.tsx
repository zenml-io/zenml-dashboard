import { SnapshotSelectorContextProvider } from "@/components/pipeline-snapshots/selector-context";
import { PipelineSnapshotsContent } from "./page.content";
import { usePipelineDetailSnapshotsBreadcrumbs } from "./use-breadcrumbs";

export default function PipelineDetailPage() {
	usePipelineDetailSnapshotsBreadcrumbs();

	return (
		<div className="space-y-5">
			<SnapshotSelectorContextProvider>
				<PipelineSnapshotsContent />
			</SnapshotSelectorContextProvider>
		</div>
	);
}
