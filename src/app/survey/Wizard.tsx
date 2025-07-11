import { SlackStep } from "@/components/survey/SlackStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { SuccessStep } from "@/components/survey/SuccessStep";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { AiChallengesStep } from "./ai-challenge-step";
import { PrimaryRoleStep } from "./primary-role-step";
import { SurveyUserProvider } from "./SurveyUserContext";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurveyContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	return (
		<>
			<SurveyUserProvider>
				<StepDisplay stepAmount={4} />
				{surveyStep === 1 && <AccountDetailsStep user={data} />}
				{surveyStep === 2 && <PrimaryRoleStep user={data} />}
				{surveyStep === 3 && <AiChallengesStep />}
				{surveyStep === 4 && <SlackStep />}
				{surveyStep === 5 && (
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
