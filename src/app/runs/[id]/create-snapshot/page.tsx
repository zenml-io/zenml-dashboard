import { CreateSnapshotForm } from "@/components/pipeline-snapshots/create/form";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useParams } from "react-router-dom";

export default function CreateSnapshotFromRunPage() {
	const { runId } = useParams() as { runId: string };
	const runQuery = usePipelineRun({ runId });

	if (runQuery.isPending) return <p>Loading...</p>;
	if (runQuery.isError) return <p>Error</p>;

	return (
		<div className="mx-auto w-full max-w-2xl p-5">
			<CreateSnapshotForm run={runQuery.data} />
		</div>
	);
}
