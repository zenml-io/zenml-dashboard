import { WizardProvider } from "@/context/WizardContext";
import { CreateConnectorHeader } from "./header";
import { LeftSideMenu } from "@/components/wizard/LeftSideMenu";
import { ConnectorRegistrationWizard } from "./wizard";
const menuEntries = ["Connector Type", "Configuration"];

export default function RegisterConnector() {
	return (
		<div>
			<CreateConnectorHeader />
			<div className="layout-container flex flex-col gap-5 px-3 py-5 xl:flex-row xl:px-0">
				<WizardProvider maxSteps={menuEntries.length} initialStep={0}>
					<div className="shrink-0">
						<LeftSideMenu entries={menuEntries} />
					</div>
					<div className="w-full">
						<ConnectorRegistrationWizard />
					</div>
				</WizardProvider>
			</div>
		</div>
	);
}
