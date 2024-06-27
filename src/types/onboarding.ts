export type OnboardingChecklistItemName =
	| "device_verified"
	| "pipeline_run"
	| "starter_setup_completed"
	| "service_connector_created"
	| "remote_artifact_store_created"
	| "remote_orchestrator_created"
	| "stack_with_remote_artifact_store_created"
	| "stack_with_remote_orchestrator_created"
	| "pipeline_run_with_remote_artifact_store"
	| "pipeline_run_with_remote_orchestrator"
	| "production_setup_completed";

export type OnboardingResponse = OnboardingChecklistItemName[];

export type OnboardingStep = {
	completed: boolean;
	active: boolean;
	hasDownstreamStep: boolean;
};
