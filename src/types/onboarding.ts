export type OnboardingChecklistItemName =
	| "device_verified"
	| "pipeline_run"
	| "snapshot_deployed"
	| "oss_onboarding_completed";

export type OnboardingResponse = OnboardingChecklistItemName[];

export type OnboardingStep = {
	completed: boolean;
	active: boolean;
	hasDownstreamStep: boolean;
};
