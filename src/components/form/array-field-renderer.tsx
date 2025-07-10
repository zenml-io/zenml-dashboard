import Plus from "@/assets/icons/plus.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useFieldArray, useFormContext } from "react-hook-form";
import { JSONSchema } from "../../types/forms";
import { RendererHeadline } from "./common";
import { DynamicField } from "./form";
import { DynamicFieldProps } from "./helper";

export function ArrayFieldRenderer({
	name,
	label,
	isOptional,
	schema,
	definitions
}: DynamicFieldProps & { definitions: JSONSchema["$defs"] }) {
	const form = useFormContext();
	const { fields, append, remove } = useFieldArray({ name: name, control: form.control });

	return (
		<div className="space-y-3">
			{!!label && (
				<label className="text-text-sm">
					<RendererHeadline
						label={label}
						isOptional={isOptional}
						schema={schema}
						fieldName={name}
					/>
				</label>
			)}
			<ul className="space-y-5">
				{fields.map((field, index) => (
					<li className="flex w-full items-center gap-4 [&>div]:w-full" key={field.id}>
						<DynamicField
							isNested
							name={`${name}.${index}`}
							schema={schema}
							isOptional={isOptional}
							definitions={definitions}
						/>
						<Button
							className="h-7 w-7"
							emphasis="subtle"
							size="sm"
							type="button"
							onClick={() => remove(index)}
						>
							<Trash className="h-5 w-5 fill-primary-900" />
							<span className="sr-only">remove</span>
						</Button>
					</li>
				))}
			</ul>
			<Button className="h-7 w-7" emphasis="subtle" type="button" onClick={() => append("")}>
				<Plus className="h-5 w-5 fill-primary-900" />
				<p className="sr-only">Add Item</p>
			</Button>
		</div>
	);
}
