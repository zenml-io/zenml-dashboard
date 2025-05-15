import Container from "@/assets/icons/container.svg?react";
import ConfigIcon from "@/assets/icons/tool-02.svg?react";
import Trigger from "@/assets/icons/trigger.svg?react";
import { useRouteSegment } from "@/hooks/use-route-segment";
import { routes } from "@/router/routes";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library/components/client";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ServiceConnectorTabs({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const { connectorId } = useParams() as { connectorId: string };

	const selectedTab = useRouteSegment(3);

	function changeValue(val: string) {
		if (val === "configuration") {
			navigate(routes.settings.connectors.detail.configuration(connectorId));
		}
		if (val === "components") {
			navigate(routes.settings.connectors.detail.components(connectorId));
		}
		if (val === "resources") {
			navigate(routes.settings.connectors.detail.resources(connectorId));
		}
	}

	return (
		<Tabs onValueChange={changeValue} value={selectedTab || "configuration"}>
			<TabsList>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="configuration">
					<ConfigIcon className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Configuration</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="components">
					<Container className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Components</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="resources">
					<Trigger className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Resources</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="configuration">
				{children}
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="components">
				{children}
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="resources">
				{children}
			</TabsContent>
		</Tabs>
	);
}
