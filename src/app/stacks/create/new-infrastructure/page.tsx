import { LeftSideMenu } from "./LeftSideMenu";
import { NewInfraFormProvider } from "./NewInfraFormContext";
import { NewInfraWizardProvider } from "./NewInfraWizardContext";
import { CreateNewInfraWizard } from "./Wizard";

export default function StackWithNewInfrastructurePage() {
	return (
		<NewInfraWizardProvider>
			<NewInfraFormProvider>
				<section className="layout-container flex flex-col gap-5 p-5 md:flex-row">
					<LeftSideMenu
						entries={[
							"Infrastructure Type",
							"Cloud Provider",
							"Review Configuration",
							"Deploy Stack"
						]}
					/>
					<div className="w-full">
						<CreateNewInfraWizard />
					</div>
				</section>
			</NewInfraFormProvider>
		</NewInfraWizardProvider>
	);
}
