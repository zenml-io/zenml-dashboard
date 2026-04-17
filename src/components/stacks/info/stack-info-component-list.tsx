import { CollapsibleCard } from "@/components/CollapsibleCard";
import {
	getSortedComponentTypeEntries,
	isStackComponentActiveInStep,
	type StepComponentConfig
} from "@/lib/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponent, StackComponentType } from "@/types/components";
import { Stack } from "@/types/stack";
import { Badge } from "@zenml-io/react-component-library";
import { StackInfoComponentListItem } from "./stack-info-component-list-item";

type Props = {
	stack: Stack;
	objectConfig: Record<string, unknown>;
	stepConfig?: StepComponentConfig;
};
export function StackInfoComponentList({ stack, objectConfig, stepConfig }: Props) {
	const componentsList = (stack.metadata?.components ?? {}) as Record<
		StackComponentType,
		StackComponent[]
	>;

	const sortedEntries = getSortedComponentTypeEntries(componentsList);

	return (
		<ul className="space-y-5">
			{sortedEntries.map(([type, components]) => {
				if (components.length === 0) {
					return null;
				}

				if (components.length > 1) {
					return (
						<li key={type} className="w-full">
							<CollapsibleCard
								initialOpen
								title={
									<div className="flex items-center gap-1">
										{snakeCaseToTitleCase(type)}s{" "}
										<Badge className="rounded-sm" size="xs" color="grey">
											{components.length}
										</Badge>
									</div>
								}
							>
								<ul className="space-y-5">
									{components.map((component, idx) => (
										<li key={component.id} className="w-full">
											<StackInfoComponentListItem
												isInactive={
													!isStackComponentActiveInStep(component, components, stepConfig)
												}
												isNested
												isDefault={idx === 0}
												component={component}
												objectConfig={objectConfig}
											/>
										</li>
									))}
								</ul>
							</CollapsibleCard>
						</li>
					);
				}

				return (
					<li key={type} className="w-full">
						<StackInfoComponentListItem component={components[0]} objectConfig={objectConfig} />
					</li>
				);
			})}
		</ul>
	);
}
