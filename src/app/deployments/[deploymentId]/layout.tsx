import { Outlet, useParams } from "react-router-dom";
import { DeploymentDetailHeader } from "./_layout/header";

export default function DeploymentDetailLayout() {
	const { deploymentId } = useParams() as { deploymentId: string };
	return (
		<div className="flex h-full flex-col">
			<DeploymentDetailHeader deploymentId={deploymentId} />
			<section className="flex-1">
				<Outlet />
			</section>
		</div>
	);
}
