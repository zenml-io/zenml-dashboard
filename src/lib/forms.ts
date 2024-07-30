import { z } from "zod";

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
