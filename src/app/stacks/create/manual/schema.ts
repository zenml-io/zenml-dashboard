import { stackComponentTypes } from "@/lib/constants";
import { StackComponentType } from "@/types/components";
import { z } from "zod";
import { stackNameSchema } from "../components/sharedSchema";

const componentSchema = z.object({
	id: z.string().trim().min(1),
	name: z.string().trim().min(1),
	logoUrl: z.string().trim().min(1)
});

export type ComponentFormSchema = z.ZodArray<typeof componentSchema>;

type TypeSchema = Record<(typeof stackComponentTypes)[number], z.ZodArray<typeof componentSchema>>;

const typeSchema = stackComponentTypes.reduce<TypeSchema>((schema, type) => {
	schema[type] = z.array(componentSchema);
	return schema;
}, {} as TypeSchema);

export const formSchema = (currentName?: string) =>
	z.object({
		stackName: stackNameSchema(currentName),
		components: z.object({
			...typeSchema,
			orchestrator: z
				.array(componentSchema)
				.min(1, "An orchestrator is required")
				.max(1, "Only one orchestrator is allowed"),
			artifact_store: z
				.array(componentSchema)
				.min(1, "An artifact store is required")
				.max(1, "Only one artifact store is allowed")
		})
	});

export type FormType = z.infer<ReturnType<typeof formSchema>>;

export const MULTI_COMPONENT_TYPES: StackComponentType[] = [
	"alerter",
	"experiment_tracker",
	"step_operator"
];

export function isMultiComponentType(type: StackComponentType): boolean {
	return MULTI_COMPONENT_TYPES.includes(type);
}
