import { useResourcesContext } from "@/layouts/connectors-detail/resources-context";
import { ResourcesList } from "./resources-list";
import { ConnectorVerifyBox } from "./verify-box";
export default function ResourcesContent() {
	const { resources } = useResourcesContext();
	if (resources === null) {
		return <ConnectorVerifyBox />;
	}

	return <ResourcesList />;
}
