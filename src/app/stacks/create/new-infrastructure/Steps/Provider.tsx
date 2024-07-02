import Aws from "@/assets/icons/services/aws.svg?react";
import Azure from "@/assets/icons/services/azure.svg?react";
import GCP from "@/assets/icons/services/gcp.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@zenml-io/react-component-library";
import { InputHTMLAttributes, ReactNode, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { ProviderForm, providerSchema } from "./schemas";

export function ProviderStep() {
	const { formRef, setIsNextButtonDisabled, setData, data } = useNewInfraFormContext();

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<ProviderForm>({
		resolver: zodResolver(providerSchema),
		defaultValues: { provider: data.provider }
	});

	useEffect(() => {
		setIsNextButtonDisabled(!isValid);
	}, [isValid, setIsNextButtonDisabled]);

	function submitProvider(data: ProviderForm) {
		setData((prev) => ({ ...prev, provider: data.provider }));
		console.log(data);
	}

	return (
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
						icon={<Aws className="h-6 w-6 shrink-0" />}
						title="AWS"
						subtitle="ZenML stack with S3, ECR, and SageMaker integration"
					/>
				</CloudProviderRadioButton>
				<CloudProviderRadioButton id="azure-provider" {...register("provider")} value="azure">
					<ProviderCard
						icon={<Azure className="h-6 w-6 shrink-0" />}
						title="Azure"
						subtitle="Set up ZenML with Azure Storage, Container Registry, and ML services"
					/>
				</CloudProviderRadioButton>
				<CloudProviderRadioButton id="gcp-provider" {...register("provider")} value="gcp">
					<ProviderCard
						icon={<GCP className="h-6 w-6 shrink-0" />}
						title="GCP"
						subtitle="Create ZenML infrastructure using GCS, Artifact Registry, and Vertex AI"
					/>
				</CloudProviderRadioButton>
			</form>
		</div>
	);
}

type ProviderRadioProps = InputHTMLAttributes<HTMLInputElement>;
const CloudProviderRadioButton = forwardRef<HTMLInputElement, ProviderRadioProps>(
	({ children, className, id, ...rest }, ref) => (
		<div className="min-h-[160px] min-w-[160px]">
			<input id={id} {...rest} ref={ref} className={cn("peer sr-only", className)} type="radio" />
			<label
				htmlFor={id}
				className="flex h-full w-full flex-col items-start justify-center space-y-5 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-5 text-text-lg text-theme-text-secondary hover:cursor-pointer	peer-checked:border-primary-100 peer-checked:bg-primary-25 peer-focus-visible:border-primary-100 peer-disabled:cursor-default"
			>
				{children}
			</label>
		</div>
	)
);

CloudProviderRadioButton.displayName = "CloudProviderRadioButton";

type ProviderCardProps = {
	icon: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
};
function ProviderCard({ icon, title, subtitle }: ProviderCardProps) {
	return (
		<div className="space-y-1 text-left">
			{icon}
			<p className="text-text-lg font-semibold text-theme-text-primary">{title}</p>
			<p className="text-text-sm text-theme-text-secondary">{subtitle}</p>
		</div>
	);
}
