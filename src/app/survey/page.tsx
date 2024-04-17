import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import StepDisplay from "@/components/survey/StepDisplay";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { getIsDefaultUser } from "@/lib/user";
import { Skeleton } from "@zenml-io/react-component-library";
import { useState } from "react";
import { PrimaryUseForm as PrimaryUseFormType } from "@/components/survey/form-schemas";
import { UserMetadata } from "@/types/user";

export default function SurveyPage() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });
	const [activeStep, setActiveStep] = useState(2);

	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess(_, variables) {
			if (variables.email) {
				setActiveStep(2);
			}
			if ((variables.user_metadata as UserMetadata).models_production) {
				setActiveStep(3);
			}
		}
	});

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[300px]" />;

	const isDefaultUser = getIsDefaultUser(data);

	function handleDetailsSubmit({ fullName, getUpdates, workEmail, username }: AccountDetailForm) {
		mutate({
			email: workEmail,
			full_name: fullName,
			name: username,
			user_metadata: { get_updates: getUpdates }
		});
	}

	function handlePrimaryUseSubmit({ amountProductionModels, primaryUse }: PrimaryUseFormType) {
		const metadata: UserMetadata = {
			models_production: amountProductionModels,
			primary_use: primaryUse
		};
		mutate({ user_metadata: metadata });
	}

	return (
		<div>
			<StepDisplay stepAmount={isDefaultUser ? 4 : 3} activeStep={activeStep} />
			{activeStep === 1 && <AccountDetailsForm user={data} submitHandler={handleDetailsSubmit} />}
			{activeStep === 2 && <PrimaryUseForm user={data} submitHandler={handlePrimaryUseSubmit} />}
		</div>
	);
}
