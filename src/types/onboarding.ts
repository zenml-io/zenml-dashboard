export type OnboardingChecklistItemName = "connect_zenml" | "run_first_pipeline";

export type OnboardingState = {
	[key in OnboardingChecklistItemName]?: boolean;
};
