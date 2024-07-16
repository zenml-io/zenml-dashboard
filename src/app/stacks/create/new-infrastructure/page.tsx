import { LeftSideMenu } from "./LeftSideMenu";
import { NewInfraFormProvider } from "./NewInfraFormContext";
import { NewInfraWizardProvider } from "./NewInfraWizardContext";
import { CreateNewInfraWizard } from "./Wizard";
import { parseWizardData } from "./persist";

export default function StackWithNewInfrastructurePage() {
	const { success } = parseWizardData();
	return (
		<NewInfraWizardProvider initialStep={success ? 3 : undefined}>
			<NewInfraFormProvider>
				<section className="layout-container flex flex-col gap-5 p-5 xl:flex-row">
					<LeftSideMenu
						entries={[
							"Infrastructure Type",
							"Cloud Provider",
							"Review Configuration",
							"Deploy Stack"
						]}
					/>
					<div className="w-full overflow-y-hidden">
						<CreateNewInfraWizard />
					</div>
				</section>
			</NewInfraFormProvider>
		</NewInfraWizardProvider>
	);
}
