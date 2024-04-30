import { StackComponentType } from "@/types/components";
import { OnboardingChecklistItemName } from "@/types/onboarding";

export const FIVEMEGABYTES = 5 * 1024 * 1024;

export const StackComponentTypes: StackComponentType[] = [
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
	"model_registry"
];

export const PRODUCTION_SETUP_ITEMS: OnboardingChecklistItemName[] = [
	"create_service_connector",
	"create_remote_artifact_store",
	"create_remote_stack",
	"run_remote_pipeline"
];
