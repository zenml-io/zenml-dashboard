import { DeploymentSelectorContextProvider } from "@/components/deployments/selector-context";
import { GlobalDeploymentsContent } from "./page.content";

export default function GlobalDeploymentList() {
	return (
		<div className="space-y-5 py-5">
			<DeploymentSelectorContextProvider>
				<GlobalDeploymentsContent />
			</DeploymentSelectorContextProvider>
		</div>
	);
}
