import { StackComponentType } from "@/types/components";
import { z } from "zod";
import { stackNameSchema } from "../components/sharedSchema";

export const types: StackComponentType[] = [
	"orchestrator",
	"artifact_store",
	"container_registry",
	"step_operator",
	"model_deployer",
	"feature_store",
	"experiment_tracker",
	"alerter",
	"annotator",
	"data_validator",
	"image_builder",
	"model_registry"
] as const;

const componentSchema = z.object({
	id: z.string().trim().min(1),
	name: z.string().trim().min(1),
	logoUrl: z.string().trim().min(1)
});

const typeSchema = types.reduce(
	(schema, type) => {
		schema[type] = componentSchema.nullable();
		return schema;
	},
	{} as Record<
		(typeof types)[number],
		z.ZodNullable<z.ZodObject<{ id: z.ZodString; name: z.ZodString; logoUrl: z.ZodString }>>
	>
);

export const formSchema = z.object({
	stackName: stackNameSchema,
	components: z.object({
		...typeSchema,
		orchestrator: componentSchema,
		artifact_store: componentSchema
	})
});

export type FormType = z.infer<typeof formSchema>;
