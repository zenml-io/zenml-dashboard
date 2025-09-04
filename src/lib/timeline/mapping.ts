import { Edge, RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";
import { TimelineItem } from "./types";

type Config = {
	steps: RawStepNode[];
	artifacts: RawArtifactNode[];
	edges: Edge[];
};

export function buildTimelineItems({ steps, artifacts, edges }: Config): TimelineItem[] {
	const transformedSteps: TimelineItem[] = steps.map((step) => {
		const inputs: RawArtifactNode[] = [];
		const outputs: RawArtifactNode[] = [];
		const attachedEdges = edges.filter(
			(e) => e.source === step.node_id || e.target === step.node_id
		);

		attachedEdges.forEach((e) => {
			if (e.source === step.node_id) {
				const artifact = artifacts.find((a) => a.node_id === e.target);
				if (artifact) {
					outputs.push(artifact);
				}
			} else {
				const artifact = artifacts.find((a) => a.node_id === e.source);
				if (artifact) {
					inputs.push(artifact);
				}
			}
		});

		const timelineItem: TimelineItem = {
			step,
			inputs,
			outputs
		};

		return timelineItem;
	});

	return transformedSteps;
}
