import { CreateSnapshotForm } from "@/components/pipeline-snapshots/create/form";
import { useCreateSnapshotBreadcrumbs } from "./breadcrumbs";

export default function CreateSnapshotPage() {
	useCreateSnapshotBreadcrumbs();
	return (
		<div className="mx-auto w-full max-w-4xl p-5">
			<CreateSnapshotForm run={undefined} />
		</div>
	);
}
