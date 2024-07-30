import { LeftSideMenu } from "@/components/wizard/LeftSideMenu";
import { WizardProvider } from "@/context/WizardContext";
import { ExistingInfraProvider } from "./ExistingInfraContext";
import { ExistingInfraWizard } from "./Wizard";

const menuEntries = [
	"Infrastructure Type",
	"Cloud Provider",
	"Connect your Cloud",
	"Artifact Store",
	"Orchestrator",
	"Container Registry"
];

export default function ExistingInfraPage() {
	return (
		<WizardProvider maxSteps={menuEntries.length + 1} initialStep={1}>
			<ExistingInfraProvider>
				<section className="layout-container flex flex-col gap-5 py-5 xl:flex-row">
					<LeftSideMenu entries={menuEntries} />
					<div className="w-full">
						<ExistingInfraWizard />
					</div>
				</section>
			</ExistingInfraProvider>
		</WizardProvider>
	);
}
