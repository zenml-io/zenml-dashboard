import Package from "@/assets/icons/package.svg?react";
import Pin from "@/assets/icons/pin.svg?react";
import { InfoBox } from "@/components/Infobox";
import { useFormContext } from "react-hook-form";
import { ConfigurationForm } from "../schemas";
import { LocationSelect } from "./LocationSelect";
import { CloudComponents } from "../../Providers";
import { useNewInfraFormContext } from "../../NewInfraFormContext";

export function Region() {
	return (
		<div className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Pin className="h-5 w-5 fill-primary-400" />
					Choose Your Location
				</p>
				<p className="text-theme-text-secondary">
					Select where you want to deploy your Cloud components for optimal performance and
					compliance.
				</p>
			</div>
			<LocationSelect />
		</div>
	);
}

export function ReviewYourStack() {
	const { data } = useNewInfraFormContext();
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
			<CloudComponents
				type={data.provider!}
				componentProps={{ displayPermissions: true, stackName: watch("stackName") }}
			/>
			<InfoBox>
				These resources create a basic ZenML stack for ML workflow management. ZenML supports highly
				flexible stacks. You can build advanced stacks at any time, combining your preferred tools
				and components for more complex MLOps.
			</InfoBox>
		</div>
	);
}
