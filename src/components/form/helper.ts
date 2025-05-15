import { snakeCaseToTitleCase } from "@/lib/strings";
import { JSONSchemaDefinition } from "@/types/forms";
import { isArray, isObject } from "@/lib/type-guards";

export function isTextField(schema: JSONSchemaDefinition) {
	return schema.type === "string";
}

export function isEnumField(schema: JSONSchemaDefinition) {
	return schema.type === "string" && schema.enum !== undefined;
}

export function isSensitiveField(schema: JSONSchemaDefinition) {
	return schema.type === "string" && !!schema.sensitive;
}

export function isBooleanField(schema: JSONSchemaDefinition) {
	return schema.type === "boolean";
}

export function isObjectField(schema: JSONSchemaDefinition) {
	return schema.type === "object";
}

export function isArrayField(schema: JSONSchemaDefinition) {
	return schema.type === "array";
}

export function isIntegerField(schema: JSONSchemaDefinition) {
	return schema.type === "integer";
}

export function getEnumValues(schema: JSONSchemaDefinition): string[] {
	return schema.enum?.map((item) => item.toString()) || [];
}

export function resolveRef(
	schema: JSONSchemaDefinition,
	definitions?: JSONSchemaDefinition["$defs"]
): JSONSchemaDefinition {
	if (!schema.$ref || !definitions) return schema;

	const refPath = schema.$ref.replace("#/$defs/", "");
	const resolvedSchema = definitions[refPath];

	if (!resolvedSchema) {
		console.error(`Could not resolve $ref: ${schema.$ref}`);
	}

	return resolvedSchema;
}

export type DynamicFieldProps = {
	schema: JSONSchemaDefinition;
	name: string;
	label: string;
	isOptional: boolean;
};

export function getNameFromSchema(schema: JSONSchemaDefinition, keyName: string) {
	if (schema.title) return schema.title;
	return snakeCaseToTitleCase(keyName);
}

export function generateDefaultValues(
	schema: JSONSchemaDefinition,
	initialValues?: Record<string, any>
) {
	const defaultValues = Object.entries(schema.properties || {}).reduce((acc, [key, prop]) => {
		let value: string | boolean | object | unknown[] = "";

		if (prop.default) {
			if (isBooleanField(prop)) {
				value = prop.default;
			} else if (isObjectField(prop)) {
				value = JSON.stringify(prop.default);
			} else if (isArrayField(prop)) {
				value = prop.default;
			} else {
				value = prop.default.toString();
			}
		} else if (isArrayField(prop)) {
			value = [];
		}

		return { ...acc, [key]: value };
	}, {});

	if (initialValues) {
		Object.entries(initialValues).forEach(([key, value]) => {
			const schemaConfig = schema.properties?.[key];
			if (schemaConfig && isBooleanField(schemaConfig)) {
				(defaultValues as Record<string, any>)[key] =
					value === "True" ? true : value === "False" ? false : Boolean(value);
			} else {
				(defaultValues as Record<string, any>)[key] = isArray(value)
					? value.map((i) => JSON.stringify(i))
					: isObject(value)
						? JSON.stringify(value)
						: value;
			}
		});
	}

	return defaultValues;
}
