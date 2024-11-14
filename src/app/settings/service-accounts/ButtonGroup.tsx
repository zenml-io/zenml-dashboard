import { DeleteServiceAccountAlert } from "./DeleteAlert";
import { useServiceAccountSelectorContext } from "./SelectorContext";

export function ServiceAccountsButtonGroup() {
	const { selectedServiceAccounts } = useServiceAccountSelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${
				selectedServiceAccounts?.length
			} Service Account${selectedServiceAccounts?.length > 1 ? "s" : ""} selected`}</div>
			<DeleteServiceAccountAlert />
		</div>
	);
}
