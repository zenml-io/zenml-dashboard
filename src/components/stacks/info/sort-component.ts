import { StackComponent } from "@/types/components";
import { StackComponentType } from "@/types/components";
import { stackComponentTypes } from "@/lib/constants";

export function sortComponents(components: StackComponent[]) {
	return components.sort((a, b) => {
		const typeA = a.body?.type ?? "";
		const typeB = b.body?.type ?? "";
		const indexA = stackComponentTypes.indexOf(typeA as StackComponentType);
		const indexB = stackComponentTypes.indexOf(typeB as StackComponentType);
		// If type not found in array, put it at the end
		const orderA = indexA === -1 ? stackComponentTypes.length : indexA;
		const orderB = indexB === -1 ? stackComponentTypes.length : indexB;
		return orderA - orderB;
	});
}
