import { DeployerConfigCollapsible } from "./_components/config-collapsible";
import { DeploymentDetail } from "./_components/deployment-detail";
import { EndpointCollapsible } from "./_components/endpoint";

export default function DeploymentDetailPage() {
	return (
		<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
			<div className="space-y-5">
				<EndpointCollapsible />
				<DeploymentDetail />
			</div>
			<div>
				<DeployerConfigCollapsible />
			</div>
		</div>
	);
}
