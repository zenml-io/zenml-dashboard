import { TimelineItem } from "@/lib/timeline/types";
import LongArrowRight from "@/assets/icons/long-arrow-right.svg?react";
import { ReactNode } from "react";
import { TimelineArtifactNode, TimelineStepNode } from "./timeline-nodes";

type Props = {
	timelineItem: TimelineItem;
};

export function TimelineItemCollapsibleContent({ timelineItem }: Props) {
	const step = timelineItem.step;
	const inputs = timelineItem.inputs;
	const outputs = timelineItem.outputs;
	return (
		<div className="flex items-center gap-3 overflow-x-auto px-5 py-2">
			{inputs.length > 0 && (
				<>
					<div className="space-y-1">
						<Headline>Input Artifacts ({inputs.length})</Headline>
						<ul className="flex items-center gap-1">
							{inputs.map((input) => (
								<li key={input.node_id}>
									<TimelineArtifactNode artifact={input} />
								</li>
							))}
						</ul>
					</div>
					<LongArrowRight className="w-[30px] shrink-0 fill-neutral-400" />
				</>
			)}
			<div className="space-y-1">
				<Headline>Step</Headline>
				<TimelineStepNode step={step} />
			</div>
			{outputs.length > 0 && (
				<>
					<LongArrowRight className="w-[30px] shrink-0 fill-neutral-400" />
					<div className="space-y-1">
						<Headline>Output Artifacts ({outputs.length})</Headline>
						<ul className="flex items-center gap-1">
							{outputs.map((output) => (
								<li key={output.node_id}>
									<TimelineArtifactNode artifact={output} />
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	);
}

function Headline({ children }: { children: ReactNode }) {
	return <div className="text-text-xs text-theme-text-tertiary">{children}</div>;
}
