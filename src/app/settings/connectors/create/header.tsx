import { PageHeader } from "@/components/PageHeader";
import { useCreateConnectorBreadcrumbs } from "./breadcrumbs";

export function CreateConnectorHeader() {
	useCreateConnectorBreadcrumbs();

	return (
		<PageHeader>
			<p className="text-display-xs font-semibold">Register a Service Connector</p>
		</PageHeader>
	);
}
