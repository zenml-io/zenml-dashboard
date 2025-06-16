import Transform from "@/assets/icons/transform.svg?react";
import { routes } from "@/router/routes";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";

type Props = {
	connectorName: string;
	connectorId: string;
};

export function ConnectorTag({ connectorName, connectorId }: Props) {
	return (
		<Link to={routes.settings.connectors.detail.configuration(connectorId)}>
			<Tag color="yellow" rounded={false} className="w-fit gap-0.5" emphasis="subtle">
				<Transform width={20} height={20} className="shrink-0 fill-warning-900" />
				<span>{connectorName}</span>
			</Tag>
		</Link>
	);
}
