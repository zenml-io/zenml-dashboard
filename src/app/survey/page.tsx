import StepDisplay from "@/components/survey/StepDisplay";
import { useCurrentUser } from "@/data/users/current-user-query";
import { getIsDefaultUser } from "@/lib/user";
import { Skeleton } from "@zenml-io/react-component-library";
import { useState } from "react";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { ReasonStep } from "./ReasonStep";
import { ServerNameStep } from "./ServerNameStep";

export default function SurveyPage() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });

	// TODO it might make sense not to handle it with a index, but with actual step names or even into a context
	const [activeStep, setActiveStep] = useState(1);

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	const isDefaultUser = getIsDefaultUser(data);

	return (
		<div>
			<StepDisplay stepAmount={isDefaultUser ? 4 : 3} activeStep={activeStep} />
			{activeStep === 1 && <AccountDetailsStep user={data} updateStep={setActiveStep} />}
			{activeStep === 2 && <PrimaryUseStep user={data} updateStep={setActiveStep} />}
			{activeStep === 3 && <ReasonStep isDefaultUser={isDefaultUser} updateStep={setActiveStep} />}
			{activeStep === 4 && <ServerNameStep />}
		</div>
	);
}
