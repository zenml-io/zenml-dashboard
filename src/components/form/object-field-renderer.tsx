import { Controller, useFormContext } from "react-hook-form";
import { inputVariants } from "@zenml-io/react-component-library/components/server";
import { DynamicFieldProps } from "./helper";
import { RendererHeadline } from "./common";

export function ObjectFieldRenderer({ name, label, isOptional, schema }: DynamicFieldProps) {
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
					<textarea
						rows={4}
						placeholder="Please paste your JSON"
						className={inputVariants({
							inputSize: "md",
							className: "h-auto w-full resize-none font-mono data-[error=true]:border-error-500"
						})}
						id={name}
						{...field}
						data-error={errors ? "true" : "false"}
					/>
				)}
			/>
			{errors && <p className="text-text-sm text-error-500">{errors.message?.toString()}</p>}
		</div>
	);
}
