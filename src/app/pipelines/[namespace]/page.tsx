import { useParams } from "react-router-dom";
import { RunsSelectorProvider } from "../../runs/RunsSelectorContext";
import { usePipelineDetailBreadcrumbs } from "./breadcrumb";
import { Header } from "./Header";
import { PipelineRunsTable } from "./RunsTable";

export default function PipelineNamespacePage() {
	const { namespace } = useParams() as { namespace: string };
	usePipelineDetailBreadcrumbs(namespace);

	return (
		<div>
			<RunsSelectorProvider>
				<Header namespace={namespace} />
				<PipelineRunsTable />
			</RunsSelectorProvider>
		</div>
	);
}
