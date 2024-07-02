import { Box, Button } from "@zenml-io/react-component-library";
import { useNewInfraContext } from "./NewInfraContext";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";

export function CreateNewInfraWizard() {
	return (
		<Box className="w-full">
			<div className="border-b border-theme-border-moderate px-5 py-3 text-display-xs font-semibold">
				New Cloud Infrastructure
			</div>
			<div className="p-5">
				<p>Steps here</p>
			</div>
			<div className="flex items-center justify-end gap-2 border-t border-theme-border-moderate p-5">
				<CancelButton />
				<PrevButton />
				<NextButton />
			</div>
		</Box>
	);
}

function NextButton() {
	const maxSteps = 3;
	const { isNextButtonDisabled, setCurrentStep } = useNewInfraContext();

	function nextStep() {
		setCurrentStep((prev) => {
			if (prev < maxSteps) {
				return prev + 1;
			}
			return prev;
		});
	}

	return (
		<Button onClick={nextStep} disabled={isNextButtonDisabled} size="md">
			Next
		</Button>
	);
}

function PrevButton() {
	const { setCurrentStep } = useNewInfraContext();

	function previousStep() {
		setCurrentStep((prev) => {
			if (prev > 1) {
				return prev - 1;
			}
			return prev;
		});
	}

	return (
		<Button onClick={previousStep} emphasis="subtle" size="md">
			Prev
		</Button>
	);
}

function CancelButton() {
	return (
		<Button intent="secondary" size="md">
			<Link to={routes.stacks.create.index}>Cancel</Link>
		</Button>
	);
}
