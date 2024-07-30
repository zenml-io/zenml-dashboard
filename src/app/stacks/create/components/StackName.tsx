import Stack from "@/assets/icons/stack.svg?react";
import { Input } from "@zenml-io/react-component-library";
import { useFormContext } from "react-hook-form";

export function StackName() {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<section className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Stack className="h-5 w-5 fill-primary-400" />
					Select a name for your Stack
				</p>
				<p className="text-theme-text-secondary">
					Please select a name for your stack, that is not used already.
				</p>
			</div>
			<div className="flex items-center space-x-2">
				<div className="space-y-1">
					<Input
						className={`${errors.stackName ? "border-red-500" : ""}`}
						placeholder="zenml-remote-stack"
						{...register("stackName")}
					/>
					{errors.stackName && (
						<p className="text-text-xs text-red-500">{errors.stackName.message?.toString()}</p>
					)}
				</div>
			</div>
		</section>
	);
}
