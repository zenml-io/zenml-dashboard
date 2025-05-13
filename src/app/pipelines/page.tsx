import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { useEffect } from "react";
import { PipelinesSelectorProvider } from "./PipelinesTab/PipelineSelectorContext";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";

export default function PipelinesPage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "pipelines", data: null });
	}, []);

	return (
		<PipelinesSelectorProvider>
			<PipelinesBody />
		</PipelinesSelectorProvider>
	);
}
