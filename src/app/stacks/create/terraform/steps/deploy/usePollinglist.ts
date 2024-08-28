import { useWizardContext } from "@/context/WizardContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCreateTerraformContext } from "../../TerraformContext";
import { clearWizardData } from "../../persist";
import { stackQueries } from "@/data/stacks";

export function usePollinglist() {
	const { data, timestamp } = useCreateTerraformContext();
	const { setCurrentStep } = useWizardContext();
	const fullstackDeployment = useQuery({
		...stackQueries.stackDeploymentStack({
			provider: data.provider!,
			stack_name: data.stackName!,
			date_start: timestamp,
			terraform: true
		}),
		refetchInterval: 5000,
		throwOnError: true
	});

	useEffect(() => {
		if (fullstackDeployment.data) {
			clearWizardData();
			setCurrentStep((prev) => prev + 1);
		}
	}, [fullstackDeployment.data]);

	return { fullstackDeployment, data };
}
