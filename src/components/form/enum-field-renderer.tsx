import { Controller, useFormContext } from "react-hook-form";
import { DynamicFieldProps } from "./helper";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { RendererHeadline } from "./common";

export function EnumFieldRenderer({
	name,
	label,
	isOptional,
	schema,
	enumValues
}: DynamicFieldProps & { enumValues: string[] }) {
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
				render={({ field: { onChange, ref, ...rest } }) => (
					<Select {...rest} onValueChange={onChange}>
						<SelectTrigger
							data-error={errors ? "true" : "false"}
							className="h-7 max-w-full truncate border border-neutral-300 px-2 text-left text-text-sm data-[error=true]:border-error-500"
						>
							<SelectValue placeholder="Select Option" />
						</SelectTrigger>
						<SelectContent>
							<ScrollArea viewportClassName="max-h-[300px]">
								{enumValues.map((opt) => (
									<SelectItem className="space-x-2" key={opt} value={opt}>
										{opt}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
				)}
			/>
			{errors && <p className="text-text-sm text-error-500">{errors.message?.toString()}</p>}
		</div>
	);
}
