import { AccountDetailsStep } from "./AccountDetailsStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { AwarenessStep } from "./AwarenessStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { SurveyUserProvider } from "./SurveyUserContext";
import { SuccessStep } from "../../components/survey/SuccessStep";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurveyContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	return (
		<>
			<SurveyUserProvider>
				<StepDisplay stepAmount={3} />
				{surveyStep === 1 && <AccountDetailsStep user={data} />}
				{surveyStep === 2 && <PrimaryUseStep user={data} />}
				{surveyStep === 3 && <AwarenessStep />}
				{surveyStep === 4 && (
					<SuccessStep
						subHeader="Your ZenML account is now updated"
						displayBody={false}
						username={data.name}
					/>
				)}
			</SurveyUserProvider>
		</>
	);
}
