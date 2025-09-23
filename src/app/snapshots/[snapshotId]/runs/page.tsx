import { RunsSelectorContextProvider } from "@/app/runs/RunsSelectorContext";
import { SnapshotDetailRunsContent } from "./page.content";

export default function SnapshotDetailRunsPage() {
	return (
		<div className="space-y-5">
			<RunsSelectorContextProvider>
				<SnapshotDetailRunsContent />
			</RunsSelectorContextProvider>
		</div>
	);
}
