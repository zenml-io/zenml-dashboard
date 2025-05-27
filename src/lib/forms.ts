import { JSONSchema, JSONSchemaDefinition } from "@/types/forms";
import { z, ZodTypeAny } from "zod";

export function zodSchemaFromObject(object: Record<string, unknown>) {
	const schema = Object.keys(object).reduce(
		(acc, key) => {
			acc[key] = z.string().trim().min(1);
			return acc;
		},
		{} as Record<string, z.ZodString>
	);

	return z.object(schema);
}

export function getZodSchemaFromConfig(rootSchema: JSONSchemaDefinition) {
	if (!rootSchema.properties) {
		return z.object({});
	}

	const required = rootSchema.required || [];
	const schema = rootSchema.properties;

	const zodSchema = Object.keys(schema).reduce(
		(acc, key) => {
			const config = schema[key];
			if (!config) return acc;

			const isOptional = getisOptional(key, required);
			acc[key] = getZodTypeFromSchema(config, rootSchema.$defs, isOptional);
			return acc;
		},
		{} as Record<string, ZodTypeAny>
	);

	return z.object(zodSchema);
}

function getZodTypeFromSchema(
	schema: JSONSchemaDefinition,
	definitions: JSONSchemaDefinition["$defs"],
	isOptional: boolean,
	isNested: boolean = false
): ZodTypeAny {
	let resolvedSchema = resolveRef(schema, definitions);

	if (resolvedSchema.anyOf) {
		const nonNullOption = resolvedSchema.anyOf.find((option) => option.type !== null);
		if (nonNullOption) {
			resolvedSchema = resolveRef(nonNullOption, definitions);
		}
	}

	if (resolvedSchema.allOf) {
		resolvedSchema = resolveRef(resolvedSchema.allOf[0], definitions);
	}

	const schemaType = resolvedSchema.type;

	switch (schemaType) {
		case "string":
			return !isOptional ? z.string().trim().min(1, "Required") : z.string().trim();
		case "boolean":
			return isOptional ? z.union([z.literal(""), z.boolean()]) : z.boolean();
		case "array": {
			if (isNested) {
				return isOptional ? z.union([z.literal(""), jsonSchema]) : jsonSchema;
			}
			const arraySchema = z.array(
				getZodTypeFromSchema(resolvedSchema.items || {}, definitions, false, true)
			);
			return isOptional ? arraySchema : arraySchema.min(1);
		}
		case "object":
			return isOptional ? z.union([z.literal(""), jsonSchema]) : jsonSchema;
		case "integer":
			return isOptional
				? z.union([z.literal(""), z.preprocess((val) => Number(val), z.number().int())])
				: z.preprocess((val) => Number(val), z.number().int());
		default:
			return isOptional ? z.union([z.literal(""), z.string()]) : z.string().min(1, "Required");
	}
}

export function getisOptional(key: string, required: string[]) {
	return !required.includes(key);
}

export function resolveDefinitions(defs: JSONSchema["$defs"], key: string) {
	if (!defs) return null;
	const defKey = resolveRefName(key);
	const def = defKey ? defs[defKey] : undefined;
	if (!def) return null;
	return def.properties;
}

export function resolveRefName(key: string) {
	return key.split("/").pop();
}

const jsonSchema = z
	.string()
	.refine(
		(value) => {
			try {
				JSON.parse(value);
				return true;
			} catch (_) {
				return false;
			}
		},
		{
			message: "Invalid JSON"
		}
	)
	.transform((value) => (value === "" ? value : JSON.parse(value)));

export function resolveRef(
	schema: JSONSchemaDefinition,
	definitions?: JSONSchemaDefinition["$defs"]
): JSONSchemaDefinition {
	if (!schema.$ref || !definitions) return schema;

	const refName = schema.$ref.split("/").pop();
	if (!refName || !definitions[refName]) return schema;

	return definitions[refName];
}
