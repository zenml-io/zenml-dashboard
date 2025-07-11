import { JSONSchemaDefinition } from "@/types/forms";
import { ArrayFieldRenderer } from "./array-field-renderer";
import { BooleanFieldRenderer } from "./boolean-field-renderer";
import { EnumFieldRenderer } from "./enum-field-renderer";
import {
	getEnumValues,
	getNameFromSchema,
	isArrayField,
	isBooleanField,
	isEnumField,
	isIntegerField,
	isObjectField,
	isSensitiveField,
	isTextField,
	resolveRef
} from "./helper";
import { IntegerFieldRenderer } from "./integer-field-renderer";
import { ObjectFieldRenderer } from "./object-field-renderer";
import { TextFieldRenderer } from "./text-field-renderer";
import { SensitiveTextRenderer } from "./sensitive-text-renderer";

type Props = {
	definitions: JSONSchemaDefinition["$defs"];
	name: string;
	isOptional: boolean;
	schema: JSONSchemaDefinition;
	isNested?: boolean;
};

export function DynamicField({ schema, name, isOptional, definitions, isNested }: Props) {
	let resolvedSchema = resolveRef(schema, definitions);

	// If this is an array item, use the items schema
	if (isNested && resolvedSchema.items) {
		resolvedSchema = resolveRef(resolvedSchema.items, definitions);
	}

	if (isNested && resolvedSchema.prefixItems) {
		resolvedSchema = resolveRef(resolvedSchema.prefixItems[0], definitions);
	}

	const label = isNested ? "" : getNameFromSchema(resolvedSchema, name);

	if (resolvedSchema.anyOf) {
		const nonNullOption = resolvedSchema.anyOf.find((option) => option.type !== null);
		if (nonNullOption) {
			const resolvedNullOption = resolveRef(nonNullOption, definitions);
			resolvedSchema = { ...resolvedSchema, ...resolvedNullOption };
		}
	}
	if (resolvedSchema.allOf) {
		const resolvedAllOf = resolveRef(resolvedSchema.allOf[0], definitions);
		resolvedSchema = { ...resolvedSchema, ...resolvedAllOf };
	}

	if (isEnumField(resolvedSchema)) {
		return (
			<EnumFieldRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
				enumValues={getEnumValues(resolvedSchema)}
			/>
		);
	}

	if (isSensitiveField(resolvedSchema)) {
		return (
			<SensitiveTextRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}

	if (isIntegerField(resolvedSchema)) {
		return (
			<IntegerFieldRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}
	if (isTextField(resolvedSchema)) {
		return (
			<TextFieldRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}
	if (isBooleanField(resolvedSchema)) {
		return (
			<BooleanFieldRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}
	if (isObjectField(resolvedSchema) || (isArrayField(resolvedSchema) && isNested)) {
		return (
			<ObjectFieldRenderer
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}
	if (isArrayField(resolvedSchema)) {
		return (
			<ArrayFieldRenderer
				definitions={definitions}
				name={name}
				label={label}
				schema={resolvedSchema}
				isOptional={isOptional}
			/>
		);
	}
}
