import { Box } from "@zenml-io/react-component-library/components/server";
import { ApiKeySelectorContextProvider } from "./SelectorContext";
import ServiceAccountDetailTable from "./Table";
import { APIKeyHeader } from "./header";

export default function ServiceAccountDetail() {
	return (
		<Box className="space-y-5 p-5">
			<div>
				<APIKeyHeader />
				<h1 className="my-5 text-text-lg font-semibold">API Keys</h1>
			</div>
			<ApiKeySelectorContextProvider>
				<ServiceAccountDetailTable />
			</ApiKeySelectorContextProvider>
		</Box>
	);
}
