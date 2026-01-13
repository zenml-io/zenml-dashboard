import { z } from "zod";
import { stackNameSchema } from "../components/sharedSchema";
import { stackComponentTypes } from "@/lib/constants";

const componentSchema = z.object({
	id: z.string().trim().min(1),
	name: z.string().trim().min(1),
	logoUrl: z.string().trim().min(1)
});

const typeSchema = stackComponentTypes.reduce(
	(schema, type) => {
		schema[type] = componentSchema.nullable();
		return schema;
	},
	{} as Record<
		(typeof stackComponentTypes)[number],
		z.ZodNullable<z.ZodObject<{ id: z.ZodString; name: z.ZodString; logoUrl: z.ZodString }>>
	>
);

export const formSchema = (currentName?: string) =>
	z.object({
		stackName: stackNameSchema(currentName),
		components: z.object({
			...typeSchema,
			orchestrator: componentSchema,
			artifact_store: componentSchema
		})
	});

export type FormType = z.infer<ReturnType<typeof formSchema>>;
