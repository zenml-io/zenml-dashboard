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
			let resolvedSchema = resolveRef(config, rootSchema.$defs);

			if (resolvedSchema.anyOf) {
				const nonNullOption = resolvedSchema.anyOf.find((option) => option.type !== null);
				if (nonNullOption) {
					resolvedSchema = resolveRef(nonNullOption, rootSchema.$defs);
				}
			}

			if (resolvedSchema.allOf) {
				resolvedSchema = resolveRef(resolvedSchema.allOf[0], rootSchema.$defs);
			}

			const schemaType = resolvedSchema.type;
			let type: ZodTypeAny;

			switch (schemaType) {
				case "string":
					if (!isOptional) {
						type = z.string().trim().min(1, "Required");
					} else {
						type = z.string().trim();
					}
					break;
				case "boolean":
					if (isOptional) {
						type = z.union([z.literal(""), z.boolean()]);
					} else {
						type = z.boolean();
					}
					break;
				case "array":
					if (isOptional) {
						type = z.array(z.string());
					} else {
						type = z.array(z.string()).min(1);
					}
					break;
				case "object":
					if (isOptional) {
						type = z.union([z.literal(""), jsonSchema]);
					} else {
						type = jsonSchema;
					}
					break;
				case "integer":
					if (isOptional) {
						type = z.union([z.literal(""), z.preprocess((val) => Number(val), z.number().int())]);
					} else {
						type = z.preprocess((val) => Number(val), z.number().int());
					}
					break;
				default:
					if (isOptional) {
						type = z.union([z.literal(""), z.string()]);
					} else {
						type = z.string().min(1, "Required");
					}
					break;
			}

			acc[key] = type;
			return acc;
		},
		{} as Record<string, ZodTypeAny>
	);
	return z.object(zodSchema);
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
