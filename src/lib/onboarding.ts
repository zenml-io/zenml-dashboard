import { OnboardingChecklistItemName, OnboardingResponse } from "@/types/onboarding";

export function getProgress(
	onboardingState: OnboardingResponse,
	checklistItems: OnboardingChecklistItemName[],
	finalStep: OnboardingChecklistItemName
) {
	// Filter out the finalStep from the checklist items
	const filteredItems = checklistItems.filter((item) => item !== finalStep);

	// If the final step is present in the onboarding state, return the length of the filtered items
	if (onboardingState.includes(finalStep)) {
		return filteredItems.length;
	}

	// Find the highest index of any present item in the onboarding state
	let highestIndex = -1;
	filteredItems.forEach((item, index) => {
		if (onboardingState.includes(item)) {
			highestIndex = index;
		}
	});

	// If any item is found, return the highest index + 1 as the completed count
	return highestIndex + 1;
}

export function hasOnboardingItem(
	item: OnboardingChecklistItemName,
	state: OnboardingResponse
): boolean {
	return state.includes(item);
}

export function getStarterSetupItems(isLocal: boolean): OnboardingChecklistItemName[] {
	return [...(isLocal ? [] : ["device_verified" as OnboardingChecklistItemName]), "pipeline_run"];
}

/**
 * This fun
 */
export function getProductionSetupItems(): OnboardingChecklistItemName[] {
	return [
		"service_connector_created",
		"remote_artifact_store_created",
		"pipeline_run_with_remote_artifact_store",
		"stack_with_remote_artifact_store_created"
	];
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
	if (currentIndex === -1) {
		return false; // If the item is not found in the order array, return false
	}
	const downstreamSteps = order.slice(currentIndex + 1);
	return downstreamSteps.some((step) => state.includes(step));
}

type Args = {
	onboardingState: OnboardingResponse;
	itemList: OnboardingChecklistItemName[];
	finalStep: OnboardingChecklistItemName;
};
export function getOnboardingProgress({ onboardingState, itemList, finalStep }: Args) {
	const doneItems = getProgress(onboardingState, itemList, finalStep);
	const progress = (doneItems / itemList.length) * 100;

	return {
		doneItems,
		progress
	};
}
