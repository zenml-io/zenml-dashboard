import { SlackStep } from "@/components/survey/SlackStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { SuccessStep } from "@/components/survey/SuccessStep";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { InfrastructureStep } from "./InfrastructureStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { SurveyUserProvider } from "./SurveyUserContext";
import { UsageReasonStep } from "./UsageReasonStep";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurveyContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	return (
		<>
			<SurveyUserProvider>
				<StepDisplay stepAmount={5} />
				{surveyStep === 1 && <AccountDetailsStep user={data} />}
				{surveyStep === 2 && <PrimaryUseStep user={data} />}
				{surveyStep === 3 && <UsageReasonStep />}
				{surveyStep === 4 && <InfrastructureStep />}
				{surveyStep === 5 && <SlackStep />}
				{surveyStep === 6 && (
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
