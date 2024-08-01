import { CloudProviderIcon } from "@/components/ProviderIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CloudProviderRadioButton, ProviderCard } from "../../components/ProviderRadio";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { WizardStepWrapper } from "../Wizard";
import { ProviderForm, providerFormSchema } from "./schemas";

export function ProviderStep() {
	const { formRef, setIsNextButtonDisabled, setData, data } = useNewInfraFormContext();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ProviderForm>({
		resolver: zodResolver(providerFormSchema),
		defaultValues: { provider: data.provider }
	});

	useEffect(() => {
		setIsNextButtonDisabled(!isValid);
	}, [isValid, setIsNextButtonDisabled]);

	function submitProvider(data: ProviderForm) {
		setData((prev) => ({ ...prev, provider: data.provider }));
	}

	return (
		<WizardStepWrapper title="New Cloud Infrastructure">
			<div className="space-y-5">
				<div className="space-y-1">
					<p className="text-text-lg font-semibold">Select a Cloud Provider</p>
					<p className="text-theme-text-secondary">
						Select the cloud provider where your want to create your infrastructure and deploy your
						ZenML models. You will be able to remove the ZenML stack at any time.
					</p>
				</div>
				<form
					id="provider-form"
					onSubmit={handleSubmit(submitProvider)}
					className="grid grid-cols-1 gap-3 xl:grid-cols-3"
					ref={formRef}
				>
					<CloudProviderRadioButton id="aws-provider" {...register("provider")} value="aws">
						<ProviderCard
							icon={<CloudProviderIcon provider="aws" className="h-6 w-6 shrink-0" />}
							title="AWS"
							subtitle="ZenML stack with S3, ECR, and SageMaker integration"
						/>
					</CloudProviderRadioButton>
					<CloudProviderRadioButton id="gcp-provider" {...register("provider")} value="gcp">
						<ProviderCard
							icon={<CloudProviderIcon provider="gcp" className="h-6 w-6 shrink-0" />}
							title="GCP"
							subtitle="Create ZenML infrastructure using GCS, Artifact Registry, and Vertex AI"
						/>
					</CloudProviderRadioButton>
					<CloudProviderRadioButton
						disabled
						id="azure-provider"
						{...register("provider")}
						value="azure"
					>
						<ProviderCard
							comingSoon
							icon={<CloudProviderIcon provider="azure" className="h-6 w-6 shrink-0" />}
							title="Azure"
							subtitle="Set up ZenML with Azure Storage, Container Registry, and ML services"
						/>
					</CloudProviderRadioButton>
				</form>
			</div>
		</WizardStepWrapper>
	);
}
