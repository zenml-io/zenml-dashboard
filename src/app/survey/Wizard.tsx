import { AccountDetailsStep } from "./AccountDetailsStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { ReasonStep } from "./ReasonStep";
import { ServerNameStep } from "./ServerNameStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { getIsDefaultUser } from "@/lib/user";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";

export function SurveyWizard() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const { surveyStep } = useSurvayContext();

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	const isDefaultUser = getIsDefaultUser(data);
	return (
		<>
			<StepDisplay stepAmount={isDefaultUser ? 4 : 3} />
			{surveyStep === 1 && <AccountDetailsStep user={data} />}
			{surveyStep === 2 && <PrimaryUseStep user={data} />}
			{surveyStep === 3 && <ReasonStep isDefaultUser={isDefaultUser} />}
			{surveyStep === 4 && <ServerNameStep />}
		</>
	);
}
