import * as WizardStep from "@/components/wizard/Wizard";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library/components/server";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { useCreateTerraformContext } from "../../TerraformContext";
import { Link } from "react-router-dom";
import { SuccessList } from "../../../new-infrastructure/Steps/Success/SuccessList";

export function SuccessStep() {
	const { data, timestamp } = useCreateTerraformContext();
	return (
		<WizardStep.Wrapper>
			<WizardStep.Header>New Cloud infrastructure</WizardStep.Header>
			<WizardStep.Body>
				<div className="space-y-5">
					<p className="text-theme-text-secondary">
						Here you can review the created stack and stack components. Now you can start running
						pipelines using this new configuration.
					</p>
					<SuccessList
						isTerraform
						provider={data.provider || "aws"}
						stackName={data.stackName || ""}
						timestamp={timestamp}
					/>
				</div>
			</WizardStep.Body>
			<StackWizardFooter displayCancel={false}>
				<FinishButton />
			</StackWizardFooter>
		</WizardStep.Wrapper>
	);
}

function FinishButton() {
	return (
		<Button size="md" asChild>
			<Link to={routes.stacks.overview}>Finish</Link>
		</Button>
	);
}
