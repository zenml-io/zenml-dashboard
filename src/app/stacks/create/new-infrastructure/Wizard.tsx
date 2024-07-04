import { routes } from "@/router/routes";
import { Box, Button } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewInfraFormContext } from "./NewInfraFormContext";
import { useNewInfraWizardContext } from "./NewInfraWizardContext";
import { ConfigurationStep } from "./Steps/Configuration";
import { DeployStep } from "./Steps/Deploy";
import { ProviderStep } from "./Steps/Provider";
import { SuccessStep } from "./Steps/Success/SuccessStep";

export function CreateNewInfraWizard() {
	const { currentStep } = useNewInfraWizardContext();
	if (currentStep === 1) return <ProviderStep />;
	if (currentStep === 2) return <ConfigurationStep />;
	if (currentStep === 3) return <DeployStep />;
	if (currentStep === 4) return <SuccessStep />;
}

function NextButton() {
	const maxSteps = 4;
	const { setCurrentStep, currentStep } = useNewInfraWizardContext();
	const { formRef, isNextButtonDisabled } = useNewInfraFormContext();
	const navigate = useNavigate();

	async function nextStep() {
		if (formRef.current) {
			formRef.current.requestSubmit();
			//hack
			await new Promise((r) => setTimeout(r, 20));
		}

		setCurrentStep((prev) => {
			if (prev < maxSteps) {
				return prev + 1;
			}
			return prev;
		});

		if (currentStep === maxSteps) {
			navigate(routes.stacks.overview);
		}
	}

	return (
		<Button
			form={formRef.current?.id}
			disabled={isNextButtonDisabled}
			onClick={() => nextStep()}
			size="md"
		>
			{currentStep === maxSteps ? "Finish" : "Next"}
		</Button>
	);
}

// function PrevButton() {
// 	const { setCurrentStep, currentStep } = useNewInfraWizardContext();

// 	function previousStep() {
// 		setCurrentStep((prev) => {
// 			if (prev > 1) {
// 				return prev - 1;
// 			}
// 			return prev;
// 		});
// 	}

// 	return (
// 		<Button disabled={currentStep === 1} onClick={previousStep} emphasis="subtle" size="md">
// 			Prev
// 		</Button>
// 	);
// }

function CancelButton() {
	return (
		<Button intent="secondary" size="md">
			<Link to={routes.stacks.create.index}>Cancel</Link>
		</Button>
	);
}

export function WizardStepWrapper({ children, title }: { children: ReactNode; title: ReactNode }) {
	return (
		<Box className="w-full">
			<div className="border-b border-theme-border-moderate px-5 py-3 text-display-xs font-semibold">
				{title}
			</div>
			<div className="p-5">{children}</div>
			<div className="flex items-center justify-end gap-2 border-t border-theme-border-moderate p-5">
				<CancelButton />
				{/* <PrevButton /> */}
				<NextButton />
			</div>
		</Box>
	);
}
