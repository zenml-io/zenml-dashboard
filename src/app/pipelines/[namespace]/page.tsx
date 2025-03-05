import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { PipelineRunsTable } from "./RunsTable";
import { useEffect } from "react";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { RunsDataTableContextProvider } from "../RunsTab/RunsDataTableContext";

export default function PipelineNamespacePage() {
	const { namespace } = useParams() as { namespace: string };
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	useEffect(() => {
		namespace &&
			setCurrentBreadcrumbData({
				segment: "pipeline_detail",
				data: { name: namespace }
			});
	}, [namespace]);

	return (
		<div>
			<RunsDataTableContextProvider>
				<Header namespace={namespace} />
				<PipelineRunsTable />
			</RunsDataTableContextProvider>
		</div>
	);
}
