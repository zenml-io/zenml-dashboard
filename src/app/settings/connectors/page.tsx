import { Box } from "@zenml-io/react-component-library/components/server";
import { ServiceConnectorListHeader } from "./header";
import { ServiceConnectorListContent } from "./list-content";
import { ConnectorSelectorContextProvider } from "./selector-context";
export default function ConnectorsPage() {
	return (
		<Box className="space-y-4 p-5">
			<ServiceConnectorListHeader />
			<ConnectorSelectorContextProvider>
				<ServiceConnectorListContent />
			</ConnectorSelectorContextProvider>
		</Box>
	);
}
