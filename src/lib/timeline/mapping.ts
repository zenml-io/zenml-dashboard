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

		let startTimeMs: number | undefined;
		if (step.metadata.start_time) {
			try {
				startTimeMs = new Date(`${step.metadata.start_time}Z`).getTime();
				if (isNaN(startTimeMs)) {
					console.warn(`Invalid date format for startTime: ${step.metadata.start_time}`);
					startTimeMs = undefined;
				}
			} catch (error) {
				console.warn(`Failed to parse startTime: ${step.metadata.start_time}`, error);
				startTimeMs = undefined;
			}
		}

		const timelineItem: TimelineItem = {
			step,
			inputs,
			outputs,
			startTimeMs
		};

		return timelineItem;
	});

	const sortedSteps = transformedSteps.sort((a, b) => {
		if (a.startTimeMs === undefined && b.startTimeMs === undefined) return 0;
		if (a.startTimeMs === undefined) return 1;
		if (b.startTimeMs === undefined) return -1;

		// Sort by startTimeMs in ascending order (earliest first)
		return a.startTimeMs - b.startTimeMs;
	});

	return sortedSteps;
}
