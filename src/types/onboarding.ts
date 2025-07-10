export type OnboardingChecklistItemName =
	| "device_verified"
	| "pipeline_run"
	| "oss_onboarding_completed";

export type OnboardingResponse = OnboardingChecklistItemName[];

export type OnboardingStep = {
	completed: boolean;
	active: boolean;
	hasDownstreamStep: boolean;
};
