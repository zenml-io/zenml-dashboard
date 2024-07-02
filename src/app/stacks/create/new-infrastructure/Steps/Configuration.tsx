import { InfoBox } from "@/components/Infobox";
import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { Controller, useForm } from "react-hook-form";
import { ConfigurationForm, configurationSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
export function ConfigurationStep() {
	const { formRef, setIsNextButtonDisabled, setData, data } = useNewInfraFormContext();

	const {
		handleSubmit,
		control,
		formState: { isValid },
		register
	} = useForm<ConfigurationForm>({
		resolver: zodResolver(configurationSchema),
		defaultValues: { region: data.location, stackName: data.stackName || "aws-remote-stack" }
	});

	useEffect(() => {
		setIsNextButtonDisabled(!isValid);
	}, [isValid, setIsNextButtonDisabled]);

	function handleConfigSubmit(data: ConfigurationForm) {
		setData((prev) => ({ ...prev, location: data.region, stackName: data.stackName }));
		console.log(data);
	}

	return (
		<div className="space-y-5">
			<InfoBox className="text-text-sm">
				<p className="font-semibold">Important</p>
				<p>
					This will create new resources in your account. Ensure you have the necessary permissions
					and are aware of any potential costs.
				</p>
			</InfoBox>
			<form onSubmit={handleSubmit(handleConfigSubmit)} ref={formRef} className="space-y-5">
				<div className="space-y-5">
					<div>
						<p className="text-text-lg font-semibold">Choose Your Region</p>
						<p className="text-theme-text-secondary">
							Select where you want to deploy your AWS components for optimal performance and
							compliance.
						</p>
					</div>
					<Controller
						control={control}
						name="region"
						render={({ field: { onChange, ...rest } }) => (
							<Select {...rest} onValueChange={onChange}>
								<SelectTrigger className="border border-neutral-300 px-2 text-left text-text-md">
									<SelectValue placeholder="Select your Provider" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
									<SelectItem value="us-west-1">US West (N. California)</SelectItem>
									<SelectItem value="us-west-2">US West (Oregon)</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>
				<div className="space-y-5">
					<div>
						<p className="text-text-lg font-semibold">Select a name for your Stack</p>
						<p className="text-theme-text-secondary">
							You can keep the suggested name or create your own.
						</p>
					</div>
					<Input {...register("stackName")} />
				</div>
			</form>
		</div>
	);
}
