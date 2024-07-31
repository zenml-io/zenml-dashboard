import { LeftSideMenu } from "@/components/wizard/LeftSideMenu";
import { WizardProvider } from "@/context/WizardContext";
import { NewInfraFormProvider } from "./NewInfraFormContext";
import { CreateNewInfraWizard } from "./Wizard";
import { parseWizardData } from "./persist";

const entries = ["Infrastructure Type", "Cloud Provider", "Review Configuration", "Deploy Stack"];

export default function StackWithNewInfrastructurePage() {
	const { success } = parseWizardData();
	return (
		<WizardProvider maxSteps={entries.length} initialStep={success ? 3 : 1}>
			<NewInfraFormProvider>
				<section className="layout-container flex flex-col gap-5 p-5 xl:flex-row">
					<LeftSideMenu entries={entries} />
					<div className="w-full overflow-y-hidden">
						<CreateNewInfraWizard />
					</div>
				</section>
			</NewInfraFormProvider>
		</WizardProvider>
	);
}
