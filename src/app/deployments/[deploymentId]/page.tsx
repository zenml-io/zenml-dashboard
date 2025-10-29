import { DeploymentCodeCollapsible } from "./_components/code-collapsible";
import { DeployerConfigCollapsible } from "./_components/config-collapsible";
import { DeploymentStackCollapsible } from "./_components/stack-collapsible";
import { DeploymentDetail } from "./_components/deployment-detail";
import { EndpointCollapsible } from "./_components/endpoint";

export default function DeploymentDetailPage() {
	return (
		<div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2 lg:px-[80px]">
			<div className="space-y-5">
				<DeploymentDetail />
				<EndpointCollapsible />
				<DeploymentCodeCollapsible />
			</div>
			<div className="space-y-5">
				<DeploymentStackCollapsible />
				<DeployerConfigCollapsible />
			</div>
		</div>
	);
}
