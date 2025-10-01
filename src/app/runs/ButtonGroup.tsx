import { pluralize } from "@/lib/strings";
import { DeleteRunAlert } from "./DeleteRunAlert";
import { useRunsSelectorContext } from "./RunsSelectorContext";

export function RunsButtonGroup() {
	const { selectedRowCount } = useRunsSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${selectedRowCount} ${pluralize(selectedRowCount, "Run")} selected`}</div>
			<DeleteRunAlert />
		</div>
	);
}
