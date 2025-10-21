import LongArrowRight from "@/assets/icons/long-arrow-right.svg?react";
import { TimelineItem } from "@/lib/timeline/types";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { ReactNode } from "react";
import { TimelineArtifactNode } from "./timeline-artifact-node";
import { TimelineStepNode } from "./timeline-step-node";
import { TimelineTriggeredRunNode } from "./timeline-triggered-run-node";

type Props = {
	timelineItem: TimelineItem;
	runStatus: ExecutionStatus;
};

export function TimelineItemCollapsibleContent({ timelineItem, runStatus }: Props) {
	const step = timelineItem.step;
	const inputs = timelineItem.inputs;
	const outputs = timelineItem.outputs;
	const triggeredRuns = timelineItem.triggeredRuns;
	return (
		<div className="overflow-x-auto px-5 py-2">
			<div className="flex items-end gap-2">
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
						<div className="flex h-6 items-center">
							<LongArrowRight className="w-[30px] shrink-0 fill-neutral-400" />
						</div>
					</>
				)}
				<div className="space-y-1">
					<Headline>Step</Headline>
					<TimelineStepNode step={step} runStatus={runStatus} />
				</div>
				{(outputs.length > 0 || triggeredRuns.length > 0) && (
					<div className="flex h-6 items-center">
						<LongArrowRight className="w-[30px] shrink-0 fill-neutral-400" />
					</div>
				)}
				{outputs.length > 0 && (
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
				)}
				{triggeredRuns.length > 0 && (
					<div className="space-y-1">
						<Headline>Triggered Runs ({triggeredRuns.length})</Headline>
						<ul className="flex items-center gap-1">
							{triggeredRuns.map((triggeredRun) => (
								<li key={triggeredRun.node_id}>
									<TimelineTriggeredRunNode step={triggeredRun} runStatus={runStatus} />
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

function Headline({ children }: { children: ReactNode }) {
	return <div className="whitespace-nowrap text-text-xs text-theme-text-tertiary">{children}</div>;
}
