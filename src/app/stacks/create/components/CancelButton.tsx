import { Button } from "@zenml-io/react-component-library/components/server";
import { useNavigate } from "react-router-dom";
import { clearWizardData } from "../new-infrastructure/persist";
import { routes } from "@/router/routes";

export function CancelButton() {
	const navigate = useNavigate();

	function cancel() {
		clearWizardData();
		navigate(routes.stacks.create.index);
	}
	return (
		<Button onClick={() => cancel()} intent="secondary" size="md">
			Cancel
		</Button>
	);
}
