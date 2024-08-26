import { InfoBox } from "@/components/Infobox";
import * as WizardStep from "@/components/wizard/Wizard";
import { useWizardContext } from "@/context/WizardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library/components/server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackName } from "../../../components/StackName";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { Region, ReviewYourStack } from "../../../new-infrastructure/Steps/Configuration/Partials";
import { ConfigurationForm, configurationSchema } from "../../../new-infrastructure/Steps/schemas";
import { setWizardData } from "../../persist";
import { useCreateTerraformContext } from "../../TerraformContext";
import { EstimateCosts } from "../../../new-infrastructure/Providers";

export function ConfigurationStep() {
	const { setData, data, setTimestamp } = useCreateTerraformContext();
	const { setCurrentStep } = useWizardContext();

	const form = useForm<ConfigurationForm>({
		resolver: zodResolver(configurationSchema, { async: true }),
		defaultValues: { region: data.location || "", stackName: data.stackName || "" }
	});

	function handleConfigSubmit(formData: ConfigurationForm) {
		const timestamp = new Date().toISOString().slice(0, -1);
		setWizardData({
			location: formData.region,
			provider: data.provider || "aws",
			stackName: formData.stackName,
			timestamp
		});
		setTimestamp(timestamp);
		setData((prev) => ({ ...prev, location: formData.region, stackName: formData.stackName }));
		setCurrentStep((prev) => prev + 1);
	}

	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>Review Stack Configuration</WizardStep.Header>
				<WizardStep.Body>
					<div className="space-y-5">
						<InfoBox className="text-text-sm">
							<p className="font-semibold">Important</p>
							<p>
								This will create new resources in your account. Ensure you have the necessary
								permissions and are aware of any potential costs.
							</p>
						</InfoBox>
						<form
							id="configuration-form"
							onSubmit={form.handleSubmit(handleConfigSubmit)}
							className="space-y-5"
						>
							<Region provider={data.provider || "aws"} />
							<StackName />
						</form>
						<ReviewYourStack provider={data.provider || "aws"} />
						<EstimateCosts provider={data.provider || "aws"} />
					</div>
				</WizardStep.Body>
				<StackWizardFooter>
					<NextButton />
				</StackWizardFooter>
			</WizardStep.Wrapper>
		</FormProvider>
	);
}

function NextButton() {
	const {
		formState: { isSubmitting }
	} = useFormContext<ConfigurationForm>();
	return (
		<Button disabled={isSubmitting} form="configuration-form" size="md">
			Next
		</Button>
	);
}
