import { Outlet, useParams } from "react-router";
import { DeploymentDetailHeader } from "./_layout/header";

export default function DeploymentDetailLayout() {
	const { deploymentId } = useParams() as { deploymentId: string };
	return (
		<div className="flex h-full flex-col">
			<DeploymentDetailHeader deploymentId={deploymentId} />
			<section className="flex-1 overflow-y-auto">
				<Outlet />
			</section>
		</div>
	);
}
