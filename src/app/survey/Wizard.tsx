import { AccountDetailsStep } from "./AccountDetailsStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { AwarenessStep } from "./AwarenessStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { SurveyUserProvider } from "./SurveyUserContext";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurvayContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	return (
		<>
			<SurveyUserProvider>
				<StepDisplay stepAmount={3} />
				{surveyStep === 1 && <AccountDetailsStep user={data} />}
				{surveyStep === 2 && <PrimaryUseStep user={data} />}
				{surveyStep === 3 && <AwarenessStep />}
			</SurveyUserProvider>
		</>
	);
}
