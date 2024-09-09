import { DeletePipelineAlert } from "./DeletePipelineAlert";
import { usePipelinesSelectorContext } from "./PipelineSelectorContext";

export function PipelinesButtonGroup() {
	const { selectedPipelines } = usePipelinesSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedPipelines?.length} Pipeline${selectedPipelines?.length > 1 ? "s" : ""} selected`}</div>
			<DeletePipelineAlert />
		</div>
	);
}
