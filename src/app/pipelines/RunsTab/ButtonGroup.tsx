import { DeleteRunAlert } from "./DeleteRunAlert";
import { useRunsDataTableContext } from "./RunsDataTableContext";

export function RunsButtonGroup() {
	const { selectedRowCount } = useRunsDataTableContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedRowCount} Run${selectedRowCount > 1 ? "s" : ""} selected`}</div>
			<DeleteRunAlert />
		</div>
	);
}
