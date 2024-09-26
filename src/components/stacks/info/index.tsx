import { Stack, StackComponentsList } from "@/types/stack";
import { StackHeader } from "./StackHeader";
import { ComponentCollapsible } from "./ComponentCollapsible";
import { PipelineRun } from "@/types/pipeline-runs";
import { InfoBox } from "../../Infobox";

type Props = {
	stack: Stack;
	run: PipelineRun;
};
export function StackInfo({ stack, run }: Props) {
	return (
		<div className="space-y-5">
			<StackInfobox />
			<StackHeader stack={stack} />
			<ul className="space-y-5">
				{Object.values((stack.metadata?.components as StackComponentsList) || {}).map(
					(component) => (
						<li key={component[0].id} className="w-full">
							<ComponentCollapsible component={component[0]} run={run} />
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
