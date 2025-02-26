import ConnectorIcon from "@/assets/icons/transform.svg?react";
import { ConnectorSelect } from "./connector-select";

type Props = {
	connectorResourceType: string;
};

export function ConnectorSection({ connectorResourceType }: Props) {
	return (
		<section className="w-full max-w-full space-y-3 overflow-x-hidden rounded-md border border-warning-50 bg-[#FFF6EA] p-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<ConnectorIcon className="size-5 shrink-0 fill-warning-400" />
					<p className="text-text-lg font-semibold">Connect to resource</p>
				</div>
				<p className="text-theme-text-secondary">
					You can select a Service Connector to connect ZenML to external resources
				</p>
			</div>
			<ConnectorSelect connectorResourceType={connectorResourceType} />
		</section>
	);
}
