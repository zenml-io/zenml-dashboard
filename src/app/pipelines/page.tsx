import { PageHeader } from "@/components/PageHeader";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { useEffect } from "react";
import { PipelineTabs } from "./Tabs";

export default function PipelinesPage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "pipelines", data: null });
	}, []);

	return (
		<div>
			<PageHeader>
				<h1 className="text-display-xs font-semibold">Pipelines</h1>
			</PageHeader>
			<PipelineTabs />
		</div>
	);
}
