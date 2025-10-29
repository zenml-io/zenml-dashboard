import { DeploymentCodeCollapsible } from "./_components/code-collapsible";
import { DeployerConfigCollapsible } from "./_components/config-collapsible";
import { DeploymentDetail } from "./_components/deployment-detail";
import { DockerBuildCollapsible } from "./_components/docker-build-collapsible";
import { EndpointCollapsible } from "./_components/endpoint";
import { DeploymentStackCollapsible } from "./_components/stack-collapsible";

export default function DeploymentDetailPage() {
	return (
		<div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2 lg:px-[80px]">
			<div className="space-y-5">
				<EndpointCollapsible />
				<DeploymentCodeCollapsible />
				<DeploymentDetail />
				<DeployerConfigCollapsible />
			</div>
			<div className="space-y-5">
				<DeploymentStackCollapsible />
				<DockerBuildCollapsible />
			</div>
		</div>
	);
}
