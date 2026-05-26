import { StepComponentConfig } from "@/lib/components";
import { Stack } from "@/types/stack";
import { StackInfoCollapsible } from "./stack-info-collapsible";
import { StackInfoComponentList } from "./stack-info-component-list";

type Props = {
	stack: Stack;
	objectConfig: Record<string, unknown>;
	stepConfig?: StepComponentConfig;
};

export function StackInfoFull({ stack, objectConfig, stepConfig }: Props) {
	return (
		<StackInfoCollapsible stackName={stack.name}>
			<StackInfoComponentList stack={stack} objectConfig={objectConfig} stepConfig={stepConfig} />
		</StackInfoCollapsible>
	);
}
