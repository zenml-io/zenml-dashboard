import { StackComponentType } from "../types/components";

export const FIVEMEGABYTES = 5 * 1024 * 1024;

export const stackComponentTypes: StackComponentType[] = [
	"orchestrator",
	"artifact_store",
	"container_registry",
	"step_operator",
	"model_deployer",
	"feature_store",
	"experiment_tracker",
	"alerter",
	"annotator",
	"data_validator",
	"image_builder",
	"model_registry",
	"deployer"
] as const;
