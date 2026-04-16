import { extractComponents } from "@/lib/components";
import { StackComponent, StackComponentType } from "@/types/components";
import { Stack } from "@/types/stack";
import { FormType } from "../../create/manual/schema";

export function transformStackToFormData(
	stack: Stack,
	componentTypes: StackComponentType[]
): FormType | null {
	const components = extractComponents(
		stack.metadata?.components as Record<StackComponentType, StackComponent[]> | undefined
	);

	const formComponents = componentTypes.reduce<FormType["components"]>(
		(acc, type) => {
			acc[type] = [];
			return acc;
		},
		{} as FormType["components"]
	);

	components.forEach((comp) => {
		const type = comp.body?.type;
		if (type && type in formComponents) {
			formComponents[type].push({
				id: comp.id,
				name: comp.name,
				logoUrl: comp.body?.logo_url || ""
			});
		}
	});

	// Return null if required components are missing - caller should handle this gracefully
	if (formComponents.orchestrator.length === 0 || formComponents.artifact_store.length === 0) {
		return null;
	}

	return {
		stackName: stack.name,
		components: formComponents
	};
}
