import { SnapshotDetailInfo } from "./info";
import { SnapshotDetailTabs } from "./tabs";

export function SnapshotDetailHeader({ snapshotId }: { snapshotId: string }) {
	return (
		<section className="overflow-x-hidden border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="space-y-1 px-5 pt-5 lg:px-[80px]">
				<SnapshotDetailInfo snapshotId={snapshotId} />
				<SnapshotDetailTabs />
			</div>
		</section>
	);
}
