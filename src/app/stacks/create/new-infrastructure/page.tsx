import { LeftSideMenu } from "./LeftSideMenu";
import { NewInfraProvider } from "./NewInfraContext";
import { CreateNewInfraWizard } from "./Wizard";

export default function StackWithNewInfrastructurePage() {
	return (
		<NewInfraProvider>
			<section className="layout-container flex gap-5 p-5">
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
		</NewInfraProvider>
	);
}
