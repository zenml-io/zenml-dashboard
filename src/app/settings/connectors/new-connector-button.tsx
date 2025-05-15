import { Button } from "@zenml-io/react-component-library/components/server";
import Plus from "@/assets/icons/plus.svg?react";
import { routes } from "@/router/routes";

import { Link } from "react-router-dom";
export function NewConnectorButton() {
	return (
		<Button size="md" asChild>
			<Link to={routes.settings.connectors.create}>
				<Plus className="h-5 w-5 shrink-0 fill-white" />
				<span>New Connector</span>
			</Link>
		</Button>
	);
}
