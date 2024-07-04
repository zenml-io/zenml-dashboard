import Coin from "@/assets/icons/coin.svg?react";
import CreditCard from "@/assets/icons/credit-card.svg?react";
import Package from "@/assets/icons/package.svg?react";
import Pin from "@/assets/icons/pin.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import { InfoBox } from "@/components/Infobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Input } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { AWSComponents } from "../aws/Components";
import { AWSRegionSelect } from "../aws/LocationSelect";
import { ConfigurationForm, configurationSchema } from "../schemas";

export function AWSConfigurationStep() {
	const { formRef, setIsNextButtonDisabled, setData, data } = useNewInfraFormContext();

	const form = useForm<ConfigurationForm>({
		resolver: zodResolver(configurationSchema),
		defaultValues: { region: data.location, stackName: data.stackName || "" }
	});

	useEffect(() => {
		setIsNextButtonDisabled(!form.formState.isValid);
	}, [form.formState.isValid, setIsNextButtonDisabled]);

	function handleConfigSubmit(data: ConfigurationForm) {
		setData((prev) => ({ ...prev, location: data.region, stackName: data.stackName }));
	}

	return (
		<FormProvider {...form}>
			<div className="space-y-5">
				<InfoBox className="text-text-sm">
					<p className="font-semibold">Important</p>
					<p>
						This will create new resources in your account. Ensure you have the necessary
						permissions and are aware of any potential costs.
					</p>
				</InfoBox>
				<form onSubmit={form.handleSubmit(handleConfigSubmit)} ref={formRef} className="space-y-5">
					<Region />
					<StackName />
				</form>
				<ReviewYourStack />
				<EstimateCosts />
			</div>
		</FormProvider>
	);
}

function Region() {
	return (
		<div className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Pin className="h-5 w-5 fill-primary-400" />
					Choose Your Region
				</p>
				<p className="text-theme-text-secondary">
					Select where you want to deploy your AWS components for optimal performance and
					compliance.
				</p>
			</div>
			<AWSRegionSelect />
		</div>
	);
}

function StackName() {
	const { register } = useFormContext();
	return (
		<div className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Stack className="h-5 w-5 fill-primary-400" />
					Select a name for your Stack
				</p>
				<p className="text-theme-text-secondary">
					Please select a name for your stack, that is not used already.
				</p>
			</div>
			<Input placeholder="zenml-remote-stack" {...register("stackName")} />
		</div>
	);
}

function ReviewYourStack() {
	const { watch } = useFormContext<ConfigurationForm>();
	return (
		<div className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Package className="h-5 w-5 fill-primary-400" />
					Review Your Stack Components
				</p>
				<p className="text-theme-text-secondary">
					The following components will be created for your ZenML stack.
				</p>
			</div>
			<AWSComponents displayPermissions stackName={watch("stackName")} />
			<InfoBox>
				These resources create a basic ZenML AWS stack for ML workflow management. ZenML supports
				highly flexible stacks. You can build advanced stacks at any time, combining your preferred
				tools and components for more complex MLOps.
			</InfoBox>
		</div>
	);
}

function EstimateCosts() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Coin className="h-5 w-5 fill-primary-400" />
					Estimated Cost
				</p>
				<p className="text-theme-text-secondary">
					These are rough estimates and actual costs may vary based on your usage and specific AWS
					pricing. Some services may be eligible for AWS Free Tier.
				</p>
			</div>
			<Box className="flex items-start gap-[10px] p-3">
				<div className="content-center rounded-sm bg-blue-25 p-1">
					<CreditCard className="h-5 w-5 fill-blue-400" />
				</div>
				<div>
					<p>
						Processing jobs: <span className="font-semibold text-theme-text-secondary">$0.922</span>{" "}
						<span className="text-theme-text-secondary">per hour</span>
					</p>
					<p>
						200GB of general storage:{" "}
						<span className="font-semibold text-theme-text-secondary">$0.14</span>{" "}
						<span className="text-theme-text-secondary">per hour</span>
					</p>
					<p>
						An average processing example would cost:{" "}
						<span className="font-semibold text-theme-text-success">$0.3112</span>
					</p>
					<p className="pt-3 text-text-xs text-theme-text-secondary">
						Use AWS Pricing Calculator for a detailed estimate
					</p>
				</div>
			</Box>
		</div>
	);
}
