import * as WizardStep from "@/components/wizard/Wizard";
import { useWizardContext } from "@/context/WizardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library/components/server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CloudProviderRadioButton, ProviderCard } from "../../../components/ProviderRadio";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { useCreateTerraformContext } from "../../TerraformContext";
import { ProviderForm, providerFormSchema } from "./schema";
import { CloudProviderIcon } from "@/components/ProviderIcon";

export function ProviderStep() {
	const { setData, data } = useCreateTerraformContext();
	const { setCurrentStep } = useWizardContext();

	const form = useForm<ProviderForm>({
		resolver: zodResolver(providerFormSchema),
		defaultValues: { provider: data.provider || undefined }
	});

	function submitProvider(data: ProviderForm) {
		setData((prev) => ({ ...prev, provider: data.provider }));
		setCurrentStep((prev) => prev + 1);
	}

	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>New Cloud infrastructure</WizardStep.Header>
				<WizardStep.Body>
					<div className="space-y-5">
						<div className="space-y-1">
							<p className="text-text-lg font-semibold">Select a Cloud Provider</p>
							<p className="text-theme-text-secondary">
								Select the cloud provider where your want to create your infrastructure. You will be
								able to remove the ZenML stack at any time.
							</p>
						</div>
						<form
							id="provider-form"
							onSubmit={form.handleSubmit(submitProvider)}
							className="grid grid-cols-1 gap-3 xl:grid-cols-3"
						>
							<CloudProviderRadioButton
								id="aws-provider"
								{...form.register("provider")}
								value="aws"
							>
								<ProviderCard
									icon={<CloudProviderIcon provider="aws" className="h-6 w-6 shrink-0" />}
									title="AWS"
									subtitle="Connect your existing S3, ECR, and Sagemaker components to ZenML"
								/>
							</CloudProviderRadioButton>
							<CloudProviderRadioButton
								id="gcp-provider"
								{...form.register("provider")}
								value="gcp"
							>
								<ProviderCard
									icon={<CloudProviderIcon provider="gcp" className="h-6 w-6 shrink-0" />}
									title="GCP"
									subtitle="Link your GCS, Artifact Registry, and Vertex AI components to ZenML"
								/>
							</CloudProviderRadioButton>
							<CloudProviderRadioButton
								id="azure-provider"
								{...form.register("provider")}
								value="azure"
							>
								<ProviderCard
									icon={<CloudProviderIcon provider="azure" className="h-6 w-6 shrink-0" />}
									title="Azure"
									subtitle="Integrate ZenML with your Blob Storage, Container Registry, and Azure ML"
								/>
							</CloudProviderRadioButton>
						</form>
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
		formState: { isValid }
	} = useFormContext<ProviderForm>();
	return (
		<Button form="provider-form" disabled={!isValid} size="md">
			Next
		</Button>
	);
}
