import { Stack, StackComponentsList } from "@/types/stack";
import { InfoBox } from "../../Infobox";
import { ComponentCollapsible } from "./ComponentCollapsible";
import { StackHeader } from "./StackHeader";

type Props = {
	stack: Stack;
	displayInfoBox?: boolean;
	objectConfig: Record<string, any>;
};
export function StackInfo({ stack, objectConfig, displayInfoBox = true }: Props) {
	const allComponents = Object.values(
		(stack.metadata?.components as StackComponentsList) || {}
	).flat();
	return (
		<div className="space-y-5">
			{displayInfoBox && <StackInfobox />}
			<StackHeader stack={stack} />
			<ul className="space-y-5">
				{allComponents.map((component) => (
					<li key={component.id} className="w-full">
						<ComponentCollapsible component={component} objectConfig={objectConfig} />
					</li>
				))}
			</ul>
		</div>
	);
}

function StackInfobox() {
	return (
		<InfoBox className="truncate">
			<p className="truncate">
				Current run-specific stack settings. Click on a component for full default settings.
			</p>
		</InfoBox>
	);
}
