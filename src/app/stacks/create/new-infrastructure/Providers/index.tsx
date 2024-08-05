import Coin from "@/assets/icons/coin.svg?react";
import CreditCard from "@/assets/icons/credit-card.svg?react";
import { Tick } from "@/components/Tick";
import { StackDeploymentProvider } from "@/types/stack";
import { Box, Spinner } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { AWSComponents } from "./AWS";
import { GcpComponents } from "./GCP";
import { AzureComponents } from "./Azure";

export type ProviderComponents = {
	stackName: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	displayPermissions?: boolean;
	components?: {
		connector?: Component;
		artifactStore?: Component;
		registry?: Component;
		orchestrator?: Component;
		imageBuilder?: Component;
	};
};

type Component = {
	name: string;
	id: string;
};

type Props = { componentProps: ProviderComponents } & { type: StackDeploymentProvider };

export function CloudComponents({ componentProps, type }: Props) {
	switch (type) {
		case "aws":
			return <AWSComponents {...componentProps} />;
		case "gcp":
			return <GcpComponents {...componentProps} />;
		case "azure":
			return <AzureComponents {...componentProps} />;
	}
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

export function EstimateCosts() {
	const { data } = useNewInfraFormContext();

	function PricingCalculatorLink() {
		let link = "#";
		switch (data.provider) {
			case "aws":
				link = "https://calculator.aws/#/";
				break;
			case "gcp":
				link = "https://cloud.google.com/products/calculator";
				break;
			case "azure":
				link = "https://azure.microsoft.com/en-us/pricing/calculator/";
				break;
		}

		return (
			<a href={link} target="_blank" rel="noopener noreferrer" className="link">
				official pricing calculator
			</a>
		);
	}

	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Coin className="h-5 w-5 fill-primary-400" />
					Estimated Cost
				</p>
				<p className="text-theme-text-secondary">
					These are rough estimates and actual costs may vary based on your usage.
				</p>
			</div>
			<Box className="flex items-start gap-[10px] p-3">
				<div className="content-center rounded-sm bg-blue-25 p-1">
					<CreditCard className="h-5 w-5 fill-blue-400" />
				</div>
				<div>
					<p>
						A small training job would cost around:{" "}
						<span className="font-semibold text-theme-text-success">$0.60</span>
					</p>
					<p className="text-text-xs text-theme-text-secondary">
						Please use the <PricingCalculatorLink /> for a detailed estimate
					</p>
				</div>
			</Box>
		</div>
	);
}
