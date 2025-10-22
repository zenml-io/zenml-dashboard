import { DeploymentDetailHeaderInfo } from "./info";
import { DeploymentDetailTabs } from "./tabs";

export function DeploymentDetailHeader({ deploymentId }: { deploymentId: string }) {
	return (
		<section className="shrink-0 overflow-x-hidden border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="space-y-1 px-5 pt-5 lg:px-[80px]">
				<DeploymentDetailHeaderInfo deploymentId={deploymentId} />
				<DeploymentDetailTabs />
			</div>
		</section>
	);
}
