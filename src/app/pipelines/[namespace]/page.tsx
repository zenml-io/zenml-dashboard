import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { PipelineRunsTable } from "./RunsTable";

export default function PipelineNamespacePage() {
	const { namespace } = useParams() as { namespace: string };

	return (
		<div>
			<Header namespace={namespace} />
			<PipelineRunsTable />
		</div>
	);
}
