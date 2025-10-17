import { Outlet, useParams } from "react-router-dom";
import { DeploymentDetailHeader } from "./_layout/header";

export default function DeploymentDetailLayout() {
	const { deploymentId } = useParams() as { deploymentId: string };
	return (
		<div className="overflow-y-auto">
			<DeploymentDetailHeader deploymentId={deploymentId} />
			<section className="p-5 lg:px-[80px]">
				<Outlet />
			</section>
		</div>
	);
}
