import { stackComponentTypes } from "@/lib/constants";
import { StackComponent, StackComponentType } from "@/types/components";
import { components } from "@/types/core";

export type StepComponentConfig = Pick<
	components["schemas"]["StepConfiguration-Output"],
	"step_operator" | "experiment_tracker"
>;

/**
 * Whether a stack component is active for a given step.
 * When no `stepConfig` is provided, every component is treated as active.
 * The first component of a type is treated as the default, matching existing
 * list rendering conventions.
 */
export function isStackComponentActiveInStep(
	component: StackComponent,
	componentsOfType: StackComponent[],
	stepConfig?: StepComponentConfig
): boolean {
	if (!stepConfig) return true;

	const type = component.body?.type;
	if (type !== "step_operator" && type !== "experiment_tracker") {
		return true;
	}

	if (type === "step_operator") {
		const value = stepConfig.step_operator;
		if (typeof value === "string") {
			return component.name === value;
		}
		if (value === true) {
			return componentsOfType[0]?.id === component.id;
		}
		return false;
	}

	// experiment_tracker
	const value = stepConfig.experiment_tracker;
	if (typeof value === "string") {
		return component.name === value;
	}
	if (value === true) {
		return true;
	}
	return false;
}

/**
 * Sort key for stack component types: known types follow `stackComponentTypes` order;
 * unknown types sort after all known types.
 */
export function getStackComponentTypeOrder(type: string): number {
	const index = stackComponentTypes.indexOf(type as StackComponentType);
	return index === -1 ? stackComponentTypes.length : index;
}

/**
 * Entries of `metadata.components` sorted by component type order (see `getStackComponentTypeOrder`).
 */
export function getSortedComponentTypeEntries(
	components?: Record<string, StackComponent[]>
): [string, StackComponent[]][] {
	if (!components) return [];

	return Object.entries(components).sort(([a], [b]) => {
		return getStackComponentTypeOrder(a) - getStackComponentTypeOrder(b);
	});
}

export function extractComponents(json?: Record<string, StackComponent[]>): StackComponent[] {
	if (!json) return [];
	const components: StackComponent[] = [];

	for (const key in json) {
		if (Array.isArray(json[key])) {
			components.push(...json[key]);
		}
	}

	return components;
}
