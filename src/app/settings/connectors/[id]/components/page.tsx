import { StackComponentList } from "@/app/components/StackComponentList";
import { useParams } from "react-router-dom";

export default function ConnectorComponentPage() {
	const { connectorId } = useParams() as { connectorId: string };

	return (
		<StackComponentList
			fixedQueryParams={{ connector_id: connectorId }}
			displayCreateComponent={false}
		/>
	);
}
