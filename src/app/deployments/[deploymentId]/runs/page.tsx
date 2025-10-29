import { RunsSelectorContextProvider } from "@/app/runs/RunsSelectorContext";
import { DeploymentRunsContent } from "./page.content";

export default function DeploymentRunsPage() {
	return (
		<div className="space-y-5 p-5 lg:px-[80px]">
			<RunsSelectorContextProvider>
				<DeploymentRunsContent />
			</RunsSelectorContextProvider>
		</div>
	);
}
