import * as Wizard from "@/components/wizard/Wizard";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { useRegisterConnectorContext } from "../create-context";
import { ConnectorSuccessBox } from "./success-box";
import { ConnectorSuccessTable } from "./table";

export function ConnectorSuccessStep() {
	const { createdConnector } = useRegisterConnectorContext();

	if (!createdConnector) return <p>No connector created</p>;

	return (
		<Wizard.Wrapper>
			<Wizard.Header>Your Service Connector</Wizard.Header>
			<Wizard.Body>
				<div className="space-y-5">
					<ConnectorSuccessBox connectorName={createdConnector.name} />
					<ConnectorSuccessTable connector={createdConnector} />
				</div>
			</Wizard.Body>
			<Wizard.Footer>
				<FinishButton connectorId={createdConnector.id} />
			</Wizard.Footer>
		</Wizard.Wrapper>
	);
}

type FinishButtonProps = {
	connectorId: string;
};

function FinishButton({ connectorId }: FinishButtonProps) {
	return (
		<Button asChild type="submit" size="md" intent="primary">
			<Link to={routes.settings.connectors.detail.configuration(connectorId)}>Finish</Link>
		</Button>
	);
}
