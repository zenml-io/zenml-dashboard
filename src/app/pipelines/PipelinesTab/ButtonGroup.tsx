import { DeletePipelineAlert } from "./DeletePipelineAlert";
import { usePipelineDataTableContext } from "./PipelineSelectorContext";

export function PipelinesButtonGroup() {
	const { selectedRowIDs } = usePipelineDataTableContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedRowIDs.length} Pipeline${selectedRowIDs.length > 1 ? "s" : ""} selected`}</div>
			<DeletePipelineAlert />
		</div>
	);
}
