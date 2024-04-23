export type OnboardingChecklistItemName = "connect_zenml" | "run_first_pipeline";

export type OnboardingChecklistItem = {
	[key in OnboardingChecklistItemName]: boolean;
};

export type OnboardingState = {
	starterSetup?: OnboardingChecklistItem[];
};
