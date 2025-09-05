import { ArtifactType } from "./artifact-versions";
import { components } from "./core";
import { ExecutionStatus } from "./pipeline-runs";
import { Node as ReactFlowNode } from "reactflow";

type NodeTypes = "step" | "previewStep" | "artifact" | "previewArtifact";

export type Node = components["schemas"]["Node"];
export type Edge = components["schemas"]["Edge"];
export type Dag = components["schemas"]["PipelineRunDAG"];

export type StepNodeMetadata = {
	duration?: number;
	status: ExecutionStatus;
	start_time?: string;
};

export type ArtifactNodeMetadata = {
	type: ArtifactType;
	data_type: "string";
	save_type: "string";
};

export type ArtifactNodePayload = {
	artifact_name: string;
	artifact_id: string;
	runStatus: ExecutionStatus;
} & ArtifactNodeMetadata;

export type StepNodePayload = {
	step_id: string;
	step_name: string;
	runStatus: ExecutionStatus;
} & StepNodeMetadata;

export type PreviewNodePayload = {
	runStatus: ExecutionStatus;
	node_name: string;
};

export type RawStepNode = Omit<Node, "metadata"> & {
	metadata: StepNodeMetadata;
};

export type RawArtifactNode = Omit<Node, "metadata"> & {
	metadata: ArtifactNodeMetadata;
};

export type RawPreviewNode = Omit<Node, "metadata"> & {
	metadata: PreviewNodePayload;
};

export type StepNode = ReactFlowNode<StepNodePayload, NodeTypes>;
export type ArtifactNode = ReactFlowNode<ArtifactNodePayload, NodeTypes>;
export type PreviewNode = ReactFlowNode<PreviewNodePayload, NodeTypes>;

export type IntermediateStepNode = Omit<StepNode, "position">;
export type IntermediateArtifactNode = Omit<ArtifactNode, "position">;
export type IntermediatePreviewNode = Omit<PreviewNode, "position">;
