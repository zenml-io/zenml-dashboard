import { Stack, StackComponentsList } from "@/types/stack";
import { StackInfoComponentListItem } from "./stack-info-component-list-item";
import { sortComponents } from "./sort-component";

type Props = {
	stack: Stack;
	objectConfig: Record<string, unknown>;
};
export function StackInfoComponentList({ stack, objectConfig }: Props) {
	const allComponents = sortComponents(
		Object.values((stack.metadata?.components as StackComponentsList) || {}).flat()
	);

	return (
		<ul className="space-y-5">
			{allComponents.map((component) => (
				<li key={component.id} className="w-full">
					<StackInfoComponentListItem component={component} objectConfig={objectConfig} />
				</li>
			))}
		</ul>
	);
}
