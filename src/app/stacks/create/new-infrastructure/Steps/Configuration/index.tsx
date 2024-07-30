import { InfoBox } from "@/components/Infobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { EstimateCosts } from "../../Providers";
import { WizardStepWrapper } from "../../Wizard";
import { ConfigurationForm, configurationSchema } from "../schemas";
import { Region, ReviewYourStack } from "./Partials";
import { StackName } from "../../../components/StackName";

export function ConfigurationStep() {
	const { formRef, setIsNextButtonDisabled, setData, data } = useNewInfraFormContext();

	const form = useForm<ConfigurationForm>({
		resolver: zodResolver(configurationSchema),
		mode: "onChange",
		defaultValues: { region: data.location, stackName: data.stackName || "" }
	});

	useEffect(() => {
		setIsNextButtonDisabled(!form.formState.isValid);
	}, [form.formState.isValid, setIsNextButtonDisabled]);

	function handleConfigSubmit(data: ConfigurationForm) {
		setData((prev) => ({ ...prev, location: data.region, stackName: data.stackName }));
	}

	return (
		<WizardStepWrapper title="Review Stack Configuration">
			<FormProvider {...form}>
				<div className="space-y-5">
					<InfoBox className="text-text-sm">
						<p className="font-semibold">Important</p>
						<p>
							This will create new resources in your account. Ensure you have the necessary
							permissions and are aware of any potential costs.
						</p>
					</InfoBox>
					<form
						onSubmit={form.handleSubmit(handleConfigSubmit)}
						ref={formRef}
						className="space-y-5"
					>
						<Region />
						<StackName />
					</form>
					<ReviewYourStack />
					<EstimateCosts />
				</div>
			</FormProvider>
		</WizardStepWrapper>
	);
}
