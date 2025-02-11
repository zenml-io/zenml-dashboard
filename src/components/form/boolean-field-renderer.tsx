import { Controller, useFormContext } from "react-hook-form";
import { DynamicFieldProps } from "./helper";
import { Switch } from "@zenml-io/react-component-library/components/client";
import { RendererHeadline } from "./common";

export function BooleanFieldRenderer({ name, isOptional, label }: DynamicFieldProps) {
	const form = useFormContext();
	const errors = form.formState.errors[name];
	return (
		<div className="flex flex-wrap items-center gap-3">
			<label htmlFor={name} className="text-text-sm">
				<RendererHeadline label={label} isOptional={isOptional} />
			</label>
			<Controller
				control={form.control}
				name={name}
				render={({ field: { onChange, value, ...rest } }) => (
					<Switch id={name} checked={value} onCheckedChange={(e) => onChange(e)} {...rest} />
				)}
			/>
			{errors && <p className="text-text-sm text-error-500">{errors.message?.toString()}</p>}
		</div>
	);
}
