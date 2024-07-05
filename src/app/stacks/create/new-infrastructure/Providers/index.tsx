import { ReactNode } from "react";
import { AWSComponents } from "./AWS";
import { GcpComponents } from "./GCP";
import { Spinner } from "@zenml-io/react-component-library";
import { Tick } from "@/components/Tick";

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
	};
};

type Component = {
	name: string;
	id: string;
};

type Props = { componentProps: ProviderComponents } & { type: "aws" | "gcp" };

export function CloudComponents({ componentProps, type }: Props) {
	switch (type) {
		case "aws":
			return <AWSComponents {...componentProps} />;
		case "gcp":
			return <GcpComponents {...componentProps} />;
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
