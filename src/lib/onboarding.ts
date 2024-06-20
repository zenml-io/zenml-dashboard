import { OnboardingChecklistItemName, OnboardingResponse } from "@/types/onboarding";

export function getProgress(
	onboardingState: OnboardingResponse,
	checklistItems: OnboardingChecklistItemName[]
) {
	return checklistItems.filter((item) => onboardingState.includes(item)).length;
}

export function hasOnboardingItem(
	item: OnboardingChecklistItemName,
	state: OnboardingResponse
): boolean {
	return state.includes(item);
}

export function getStarterSetupItems(isLocal: boolean) {
	return {
		items: [...(isLocal ? [] : ["device_verified" as OnboardingChecklistItemName]), "pipeline_run"],
		finishedItem: "starter_setup_completed" as OnboardingChecklistItemName
	};
}

export function getProductionSetupItems() {
	return {
		items: [
			"service_connector_created",
			"remote_artifact_store_created",
			"pipeline_run_with_remote_artifact_store",
			"stack_with_remote_artifact_store_created"
		] as OnboardingChecklistItemName[],
		finishedItem: "production_setup_completed" as OnboardingChecklistItemName
	};
}

/**
 * This function checks if there is a step with a higher index than the current one that is finished
 */
export function checkDownstreamStep(
	item: OnboardingChecklistItemName,
	state: OnboardingResponse,
	order: OnboardingChecklistItemName[]
) {
	const currentIndex = order.indexOf(item);
	const downstreamSteps = order.slice(currentIndex + 1);
	return downstreamSteps.some((step) => state.includes(step));
}
