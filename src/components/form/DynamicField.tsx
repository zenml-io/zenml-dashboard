import Plus from "@/assets/icons/plus.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { ConnectorConfigPropertiesBody } from "@/types/service-connectors";
import { Switch, Button, Input } from "@zenml-io/react-component-library";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type DynamicFieldProps = {
	schema: ConnectorConfigPropertiesBody;
	name: string;
	isOptional: boolean;
};

export function DynamicField({ schema, name, isOptional }: DynamicFieldProps) {
	const type = schema.type || schema.anyOf?.find((item) => item.type !== null)?.type;

	if (!type) return null;

	switch (type) {
		case "string":
			return <DynamicInput isOptional={isOptional} schema={schema} name={name} />;
		case "array":
			return <DynamicArray isOptional={isOptional} schema={schema} name={name} />;
		case "boolean":
			return <DynamicBoolean isOptional={isOptional} schema={schema} name={name} />;
		default:
			return null;
	}
}

function DynamicInput({ name, schema, isOptional }: DynamicFieldProps) {
	const form = useFormContext();
	const isPassword = schema.format === "password";
	return (
		<div>
			<label htmlFor={name} className="text-text-sm">
				{schema.title} {isOptional ? "(optional)" : ""}
			</label>
			<Controller
				defaultValue=""
				control={form.control}
				name={name}
				render={({ field }) => (
					<Input
						inputSize="md"
						className="w-full"
						id={name}
						{...field}
						type={isPassword ? "password" : "text"}
					/>
				)}
			/>
		</div>
	);
}

function DynamicArray({ name, schema, isOptional }: DynamicFieldProps) {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({ name, control });

	return (
		<div className="space-y-3">
			<label className="text-text-sm">
				{schema.title} {isOptional ? "(optional)" : ""}
			</label>
			<ul className="space-y-5">
				{fields.map((field, index) => (
					<li className="flex w-full items-center gap-4 [&>div]:w-full" key={field.id}>
						<Controller
							defaultValue=""
							name={`${name}.${index}`}
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

function DynamicBoolean({ name, schema, isOptional }: DynamicFieldProps) {
	const form = useFormContext();
	const defaultValue = schema.default || false;
	return (
		<div className="flex flex-wrap items-center gap-3">
			<label htmlFor={name} className="text-text-sm">
				{schema.title} {isOptional ? "(optional)" : ""}
			</label>
			<Controller
				defaultValue={defaultValue}
				control={form.control}
				name={name}
				render={({ field: { onChange, value, ...rest } }) => (
					<Switch id={name} checked={value} onCheckedChange={(e) => onChange(e)} {...rest} />
				)}
			/>
		</div>
	);
}
