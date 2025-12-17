import { extractComponents } from "@/lib/components";
import { StackComponent, StackComponentType } from "@/types/components";
import { Stack } from "@/types/stack";
import { FormType } from "../../create/manual/schema";

export function transformStackToFormData(
	stack: Stack,
	componentTypes: StackComponentType[]
): FormType | null {
	const components = extractComponents(
		stack.metadata?.components as Record<string, StackComponent[]> | undefined
	);

	const formComponents = componentTypes.reduce(
		(acc, type) => {
			acc[type] = null;
			return acc;
		},
		{} as Record<string, { id: string; name: string; logoUrl: string } | null>
	);

	components.forEach((comp) => {
		const type = comp.body?.type;
		if (type && type in formComponents) {
			formComponents[type] = {
				id: comp.id,
				name: comp.name,
				logoUrl: comp.body?.logo_url || ""
			};
		}
	});

	// Return null if required components are missing - caller should handle this gracefully
	if (!formComponents.orchestrator || !formComponents.artifact_store) {
		return null;
	}

	return {
		stackName: stack.name,
		components: formComponents as FormType["components"]
	};
}
