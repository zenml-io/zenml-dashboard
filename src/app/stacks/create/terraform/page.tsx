import { WizardProvider } from "@/context/WizardContext";
import { CreateTerraformProvider } from "./TerraformContext";
import { TerraformWizard } from "./TerraformWizard";
import { LeftSideMenu } from "@/components/wizard/LeftSideMenu";

const entries = ["Infrastructure Type", "Cloud Provider", "Review Configuration", "Deploy Stack"];

export default function TerraformPage() {
	return (
		<WizardProvider maxSteps={entries.length} initialStep={0}>
			<CreateTerraformProvider>
				<section className="layout-container flex flex-col gap-5 py-5 xl:flex-row">
					<LeftSideMenu entries={entries} />
					<div className="w-full overflow-y-hidden">
						<TerraformWizard />
					</div>
				</section>
			</CreateTerraformProvider>
		</WizardProvider>
	);
}
