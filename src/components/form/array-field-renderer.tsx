import Plus from "@/assets/icons/plus.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { Button, Input } from "@zenml-io/react-component-library/components/server";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { DynamicFieldProps } from "./helper";
import { RendererHeadline } from "./common";

export function ArrayFieldRenderer({ name, label, isOptional }: DynamicFieldProps) {
	const form = useFormContext();
	const { fields, append, remove } = useFieldArray({ name: name, control: form.control });

	return (
		<div className="space-y-3">
			<label className="text-text-sm">
				<RendererHeadline label={label} isOptional={isOptional} />
			</label>
			<ul className="space-y-5">
				{fields.map((field, index) => (
					<li className="flex w-full items-center gap-4 [&>div]:w-full" key={field.id}>
						<Controller
							name={`${name}.${index}`}
							// TODO this needs to be dynamic based on the type
							render={({ field }) => <Input className="w-full flex-1" inputSize="md" {...field} />}
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
