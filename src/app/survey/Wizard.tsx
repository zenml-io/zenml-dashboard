import { SlackStep } from "@/components/survey/SlackStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { SuccessStep } from "@/components/survey/SuccessStep";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { getUserMetadata } from "@/lib/user-metadata";
import { Skeleton } from "@zenml-io/react-component-library";
import { AboutYouStep } from "./AboutYouStep";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { SurveyUserProvider } from "./SurveyUserContext";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurveyContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	const metadata = getUserMetadata(data);

	return (
		<>
			<SurveyUserProvider>
				<StepDisplay stepAmount={3} />
				{surveyStep === 1 && (
					<AccountDetailsStep
						fullName={data.body?.full_name}
						email={data.metadata?.email ?? undefined}
					/>
				)}
				{surveyStep === 2 && (
					<AboutYouStep primaryRole={metadata.primary_role} infraType={metadata.infra_type} />
				)}
				{surveyStep === 3 && <SlackStep />}
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
