import { CreateSnapshotForm } from "@/components/pipeline-snapshots/create/form";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useParams } from "react-router-dom";
import { useCreateSnapshotFromRunBreadcrumbs } from "./breadcrumb";

export default function CreateSnapshotFromRunPage() {
	const { runId } = useParams() as { runId: string };
	const runQuery = usePipelineRun({ runId });

	useCreateSnapshotFromRunBreadcrumbs(runQuery.data);

	if (runQuery.isPending) return <p>Loading...</p>;
	if (runQuery.isError) return <p>Error</p>;

	return (
		<div className="mx-auto w-full max-w-4xl p-5">
			<CreateSnapshotForm run={runQuery.data} />
		</div>
	);
}
