import { DeletePipelineAlert } from "./DeletePipelineAlert";
import { usePipelineSelectorContext } from "./PipelineSelectorContext";

export function PipelinesButtonGroup() {
	const { selectedRowCount } = usePipelineSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedRowCount} Pipeline${selectedRowCount > 1 ? "s" : ""} selected`}</div>
			<DeletePipelineAlert />
		</div>
	);
}
