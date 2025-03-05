import { DeleteServiceAccountAlert } from "./DeleteAlert";
import { useServiceAccountDataTableContext } from "./ServiceAccountDataTableContext";

export function ServiceAccountsButtonGroup() {
	const { selectedRowCount } = useServiceAccountDataTableContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${
				selectedRowCount
			} Service Account${selectedRowCount > 1 ? "s" : ""} selected`}</div>
			<DeleteServiceAccountAlert />
		</div>
	);
}
