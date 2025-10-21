import { pluralize } from "@/lib/strings";
import { DeleteServiceAccountAlert } from "./DeleteAlert";
import { useServiceAccountSelectorContext } from "./SelectorContext";

export function ServiceAccountsButtonGroup() {
	const { selectedRowCount } = useServiceAccountSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${
				selectedRowCount
			} ${pluralize(selectedRowCount, "Service Account")} selected`}</div>
			<DeleteServiceAccountAlert />
		</div>
	);
}
