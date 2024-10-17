export type OnboardingChecklistItemName =
	| "device_verified"
	| "pipeline_run"
	| "stack_with_remote_orchestrator_created"
	| "pipeline_run_with_remote_orchestrator"
	| "production_setup_completed";

export type OnboardingResponse = OnboardingChecklistItemName[];

export type OnboardingStep = {
	completed: boolean;
	active: boolean;
	hasDownstreamStep: boolean;
};
