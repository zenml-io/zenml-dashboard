import { Box } from "@zenml-io/react-component-library/components/server";
import { Outlet } from "react-router-dom";
import { ConnectorDetailHeader } from "./header";
import { ResourcesContextProvider } from "./resources-context";
import { ServiceConnectorTabs } from "./tabs";

export default function ConnectorDetailLayout() {
	return (
		<Box className="mb-5 space-y-5 p-5">
			<ConnectorDetailHeader />
			<ResourcesContextProvider>
				<ServiceConnectorTabs>
					<Outlet />
				</ServiceConnectorTabs>
			</ResourcesContextProvider>
		</Box>
	);
}
