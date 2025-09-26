import { DeploymentSelectorContextProvider } from "@/components/deployments/selector-context";
import { PipelineDeploymentsContent } from "./page.content";

export default function PipelineDetailDeploymentsPage() {
	return (
		<div className="space-y-5">
			<DeploymentSelectorContextProvider>
				<PipelineDeploymentsContent />
			</DeploymentSelectorContextProvider>
		</div>
	);
}
