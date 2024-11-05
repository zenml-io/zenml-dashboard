import { Stack, StackComponentsList } from "@/types/stack";
import { InfoBox } from "../../Infobox";
import { ComponentCollapsible } from "./ComponentCollapsible";
import { StackHeader } from "./StackHeader";

type Props = {
	stack: Stack;
	objectConfig: Record<string, any>;
};
export function StackInfo({ stack, objectConfig }: Props) {
	return (
		<div className="space-y-5">
			<StackInfobox />
			<StackHeader stack={stack} />
			<ul className="space-y-5">
				{Object.values((stack.metadata?.components as StackComponentsList) || {}).map(
					(component) => (
						<li key={component[0].id} className="w-full">
							<ComponentCollapsible component={component[0]} objectConfig={objectConfig} />
						</li>
					)
				)}
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
