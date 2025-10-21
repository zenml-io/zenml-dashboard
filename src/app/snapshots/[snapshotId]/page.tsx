import { SnapshotCodeCollapsible } from "./_components/code";
import { SnapshotDetails } from "./_components/snapshot-detail";
import { SnapshotStack } from "./_components/snapshot-stack";

export default function SnapshotDetailPage() {
	return (
		<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
			<div className="space-y-5">
				<SnapshotDetails />
				<SnapshotCodeCollapsible />
			</div>
			<div>
				<SnapshotStack />
			</div>
		</div>
	);
}
