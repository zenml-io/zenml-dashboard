import { SnapshotSelectorContextProvider } from "@/components/pipeline-snapshots/selector-context";
import { GlobalSnapshotsContent } from "./page.content";

export default function GlobalSnapshotsPage() {
	return (
		<div className="space-y-5 py-5">
			<SnapshotSelectorContextProvider>
				<GlobalSnapshotsContent />
			</SnapshotSelectorContextProvider>
		</div>
	);
}
