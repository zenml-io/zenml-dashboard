import { Input } from "@zenml-io/react-component-library/components/server";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/app/stacks/create/manual/schema";

export function StackNameInput() {
	const {
		register,
		formState: { errors }
	} = useFormContext<FormType>();

	return (
		<div className="space-y-1">
			<label className="text-text-sm" htmlFor="stack-name">
				Stack Name
			</label>
			<Input
				id="stack-name"
				className={`${errors.stackName ? "border-red-500" : ""} w-full`}
				placeholder="zenml-stack"
				{...register("stackName")}
			/>
			<p className="text-text-xs text-theme-text-secondary">
				The stack name must be unique and cannot match an existing stack.
			</p>
			{errors.stackName && (
				<p className="text-text-xs text-red-500">{errors.stackName.message?.toString()}</p>
			)}
		</div>
	);
}
