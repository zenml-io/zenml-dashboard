export type OnboardingChecklistItemName =
	| "connect_zenml"
	| "run_first_pipeline"
	| "create_service_connector"
	| "create_remote_artifact_store"
	| "create_remote_stack"
	| "run_remote_pipeline";

export type OnboardingState = {
	[key in OnboardingChecklistItemName]?: boolean;
};
