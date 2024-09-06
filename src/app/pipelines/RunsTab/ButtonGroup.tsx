import { DeleteRunAlert } from "./DeleteRunAlert";
import { useRunsSelectorContext } from "./RunsSelectorContext";

export function RunsButtonGroup() {
	const { selectedRuns } = useRunsSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedRuns?.length} run${selectedRuns?.length > 1 ? "s" : ""} selected`}</div>
			<DeleteRunAlert />
		</div>
	);
}
