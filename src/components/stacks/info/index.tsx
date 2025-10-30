import { Stack, StackComponentsList } from "@/types/stack";
import { StackInfoComponentCollapsible } from "./stack-info-component-collapsible";
import { sortComponents } from "./sort-component";

type Props = {
	stack: Stack;
	objectConfig: Record<string, unknown>;
};
export function StackInfo({ stack, objectConfig }: Props) {
	const allComponents = sortComponents(
		Object.values((stack.metadata?.components as StackComponentsList) || {}).flat()
	);

	return (
		<ul className="space-y-5">
			{allComponents.map((component) => (
				<li key={component.id} className="w-full">
					<StackInfoComponentCollapsible component={component} objectConfig={objectConfig} />
				</li>
			))}
		</ul>
	);
}
