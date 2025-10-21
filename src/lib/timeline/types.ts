import { RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";
import { Node } from "@/types/dag-visualizer";

export type TimelineItem = {
	triggeredRuns: RawStepNode[];
	step: RawStepNode;
	inputs: RawArtifactNode[];
	outputs: RawArtifactNode[];
	startTimeMs?: number; // Parsed timestamp in milliseconds
};

export type VirtualizedStep = {
	type: "timeline";
	item: TimelineItem;
};

export type VirtualizedPlaceholder = {
	type: "placeholder";
	item: Node;
};

export type VirtualizedSeparator = {
	type: "separator";
};

export type VirtualizedItem = VirtualizedStep | VirtualizedPlaceholder | VirtualizedSeparator;
