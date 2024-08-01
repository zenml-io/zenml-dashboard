import { StackComponent } from "@/types/components";

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
