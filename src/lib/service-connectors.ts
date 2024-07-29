import { ConnectorConfigProperties } from "@/types/service-connectors";
import { z, ZodTypeAny } from "zod";

export function getZodSchemaFromConfig(schema: ConnectorConfigProperties, required: string[]) {
	const zodSchema = Object.keys(schema).reduce(
		(acc, key) => {
			const config = schema[key];
			let type: ZodTypeAny;
			const isOptional = getisOptional(key, required);
			const schemaType = config.type || config.anyOf?.find((item) => item.type !== null)?.type;

			switch (schemaType) {
				case "string":
					type = z.string().trim();
					break;
				case "boolean":
					type = z.boolean();
					break;
				case "array":
					type = z.array(z.string());
					break;
				default:
					type = z.string();
					break;
			}
			if (isOptional) {
				type = type.optional();
			}

			if (!isOptional && config.type === "string") {
				if (type instanceof z.ZodString) {
					type = type.min(1, "Required");
				}
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
