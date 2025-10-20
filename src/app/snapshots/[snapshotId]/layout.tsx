import { Outlet, useParams } from "react-router-dom";
import { SnapshotDetailHeader } from "./_layout/header";

export default function SnapshotDetailLayout() {
	const { snapshotId } = useParams() as { snapshotId: string };
	return (
		<div>
			<SnapshotDetailHeader snapshotId={snapshotId} />
			<section className="p-5 lg:px-[80px]">
				<Outlet />
			</section>
		</div>
	);
}
