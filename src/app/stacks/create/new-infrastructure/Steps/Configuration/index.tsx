import { InfoBox } from "@/components/Infobox";
import { Tick } from "@/components/Tick";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@zenml-io/react-component-library";
import { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { WizardStepWrapper } from "../../Wizard";
import { ConfigurationForm, configurationSchema } from "../schemas";
import { Region, ReviewYourStack } from "./Partials";
import { StackName } from "./StackName";
import { AwsEstimateCosts } from "../aws/Components";

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
					<AwsEstimateCosts />
				</div>
			</FormProvider>
		</WizardStepWrapper>
	);
}

type ComponentListItemProps = {
	img: { src: string; alt: string };
	title: ReactNode;
	subtitle: ReactNode;
	badge: ReactNode;
	isLoading?: boolean;
	isSuccess?: boolean;
};
export function ComponentListItem({
	img,
	title,
	subtitle,
	badge,
	isSuccess,
	isLoading
}: ComponentListItemProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				{isLoading && <Spinner className="h-5 w-5 shrink-0 border-[3px]" />}
				{isSuccess && <Tick className="h-5 w-5" tickClasses="w-3 h-3" />}
				<img width="40" height="40" alt={img.alt} src={img.src} />
				<div>
					<p className="text-text-lg font-semibold">{title}</p>
					<p className="text-theme-text-secondary">{subtitle}</p>
				</div>
			</div>
			{badge}
		</div>
	);
}
