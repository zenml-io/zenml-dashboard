import { RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";

export type TimelineItem = {
	step: RawStepNode;
	inputs: RawArtifactNode[];
	outputs: RawArtifactNode[];
	startTimeMs?: number; // Parsed timestamp in milliseconds
};
