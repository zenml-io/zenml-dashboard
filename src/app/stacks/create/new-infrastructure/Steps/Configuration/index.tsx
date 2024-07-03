import { ReactNode } from "react";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { AWSConfigurationStep } from "./AWS";
import { WizardStepWrapper } from "../../Wizard";
import { Spinner } from "@zenml-io/react-component-library";
import { Tick } from "@/components/Tick";

export function ConfigurationStep() {
	const { data } = useNewInfraFormContext();
	return (
		<WizardStepWrapper title="Deploy AWS ZenML Stack">
			{data.provider === "aws" && <AWSConfigurationStep />}
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
