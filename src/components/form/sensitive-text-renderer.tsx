import { Controller, useFormContext } from "react-hook-form";
import { RendererHeadline } from "./common";
import { DynamicFieldProps } from "./helper";
import { Input } from "@zenml-io/react-component-library/components/server";

export function SensitiveTextRenderer({ name, label, isOptional, schema }: DynamicFieldProps) {
	const form = useFormContext();
	const errors = form.formState.errors[name];

	return (
		<div className="space-y-0.5">
			{!!label && (
				<label htmlFor={name} className="text-text-sm">
					<RendererHeadline
						label={label}
						isOptional={isOptional}
						schema={schema}
						fieldName={name}
					/>
				</label>
			)}
			<Controller
				control={form.control}
				name={name}
				render={({ field }) => (
					<Input
						placeholder="Use {{<SECRET_NAME>.<SECRET_KEY>}} to reference a secret"
						inputSize="md"
						className="w-full placeholder:font-mono data-[error=true]:border-error-500"
						id={name}
						{...field}
						type="text"
						data-error={errors ? "true" : "false"}
					/>
				)}
			/>
			{errors && <p className="text-text-sm text-error-500">{errors.message?.toString()}</p>}
		</div>
	);
}
