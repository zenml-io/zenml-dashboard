import { DeleteApiKey } from "./DeleteApiKeyDialog";
import { useApiKeySelectorContext } from "./SelectorContext";

export function ApiKeyButtonGroup({ serviceAccountId }: { serviceAccountId: string }) {
	const { selectedRowCount } = useApiKeySelectorContext();
	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{`${
				selectedRowCount
			} Api Key${selectedRowCount > 1 ? "s" : ""} selected`}</div>
			<DeleteApiKey serviceAccountId={serviceAccountId} />
		</div>
	);
}
