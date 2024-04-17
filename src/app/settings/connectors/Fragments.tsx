import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { Box } from "@zenml-io/react-component-library";
import { ConnectorsSelect } from "./ConnectorsSelect";
import {
	AWSSection,
	AzureSection,
	ConnectorType,
	DockerSection,
	GCPSection,
	KubernetesSection
} from "@/contents/connectors";
import { Fragment, useState } from "react";
import { CommandListItem, generateCommandList } from "@/components/fallback-pages/Commands";
import { HelpBox } from "@/components/fallback-pages/Helpbox";

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">We are creating a new Connectors experience</p>
				<p>In the meanwhile you can use the CLI to add and manage your connectors.</p>
			</div>
		</InfoBoxPrimitive>
	);
}

export function HeaderBox() {
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full p-7 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Learn More about Connectors</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					Dive into Service Connector Types for a documented approach to secure authentication and
					authorization practices.
				</p>
			</div>
		</Box>
	);
}

export function CommandSection() {
	const [connectorType, setConnectorType] = useState<ConnectorType>("kubernetes");
	return (
		<section className="space-y-5 pl-8 pr-5">
			<ConnectorsSelect
				selectedType={connectorType}
				onTypeChange={setConnectorType}
				id="connector-select"
			/>
			{getConnectorTypeSection(connectorType)}
		</section>
	);
}

export type ConnectorTypeSectionProps = {
	topInfobox: string;
	bottomInfobox: string;
	listCommand: CommandListItem;
	prerequisites?: CommandListItem[];
	help: {
		href: string;
		text: string;
	};
};

function ConnectorTypeSection({
	topInfobox,
	bottomInfobox,
	listCommand,
	prerequisites,
	help
}: ConnectorTypeSectionProps) {
	return (
		<>
			<InfoBoxPrimitive className="text-text-md" intent="neutral">
				{topInfobox}
			</InfoBoxPrimitive>
			{generateCommandList(listCommand)}
			{prerequisites && (
				<>
					<p>Prerequisites</p>
					{prerequisites.map((item, index) => (
						<Fragment key={index}>{generateCommandList(item)}</Fragment>
					))}
				</>
			)}
			<InfoBoxPrimitive className="text-text-md" intent="neutral">
				{bottomInfobox}
			</InfoBoxPrimitive>
			<HelpBox text={help.text} link={help.href} />
		</>
	);
}

function getConnectorTypeSection(type: ConnectorType) {
	switch (type) {
		case "kubernetes":
			return ConnectorTypeSection(KubernetesSection);
		case "gcp":
			return ConnectorTypeSection(GCPSection);
		case "docker":
			return ConnectorTypeSection(DockerSection);
		case "azure":
			return ConnectorTypeSection(AzureSection);
		case "aws":
			return ConnectorTypeSection(AWSSection);
	}
}
