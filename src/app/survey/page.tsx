import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { ReasonForm } from "@/components/survey/Reason";
import StepDisplay from "@/components/survey/StepDisplay";
import {
	AccountDetailForm,
	PrimaryUseForm as PrimaryUseFormType,
	ReasonFormType,
	ServerNameFormType
} from "@/components/survey/form-schemas";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { getIsDefaultUser } from "@/lib/user";
import { routes } from "@/router/routes";
import { UserMetadata } from "@/types/user";
import { Skeleton } from "@zenml-io/react-component-library";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerNameForm } from "@/components/survey/ServerName";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";

export default function SurveyPage() {
	const { data, isPending, isError } = useCurrentUser({ throwOnError: true });

	// TODO it might make sense not to handle it with a index, but with actual step names
	const [activeStep, setActiveStep] = useState(1);
	const navigate = useNavigate();

	const { mutate: mutateServerSettings } = useUpdateServerSettings({
		onSuccess() {
			navigate("/");
		}
	});

	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess(data, variables) {
			if (variables.email) {
				setActiveStep(2);
				return;
			}
			if ((variables.user_metadata as UserMetadata).models_production) {
				setActiveStep(3);
				return;
			}

			if ((variables.user_metadata as UserMetadata).reasons) {
				if (data.name === "default") {
					setActiveStep(4);
					return;
				} else {
					navigate(routes.home);
					return;
				}
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

	function handleReasonFormSubmit({ other, reasons, otherVal }: ReasonFormType) {
		const reasonsArr = other ? [...reasons, otherVal] : reasons;
		const updateMetadata: UserMetadata = { reasons: reasonsArr as string[] };
		mutate({ user_metadata: updateMetadata });
	}

	function handleServerNameFormSubmit({ serverName }: ServerNameFormType) {
		mutateServerSettings({ name: serverName });
	}

	return (
		<div>
			<StepDisplay stepAmount={isDefaultUser ? 4 : 3} activeStep={activeStep} />
			{activeStep === 1 && <AccountDetailsForm user={data} submitHandler={handleDetailsSubmit} />}
			{activeStep === 2 && <PrimaryUseForm user={data} submitHandler={handlePrimaryUseSubmit} />}
			{activeStep === 3 && <ReasonForm submitHandler={handleReasonFormSubmit} />}
			{activeStep === 4 && <ServerNameForm submitHandler={handleServerNameFormSubmit} />}
		</div>
	);
}
