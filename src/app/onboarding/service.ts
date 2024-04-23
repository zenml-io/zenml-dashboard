import { OnboardingChecklistItemName, OnboardingState } from "@/types/onboarding";
import { ServerSettings } from "@/types/server";

export function getOnboardingState(data: ServerSettings) {
	return data.body?.onboarding_state as OnboardingState;
}

export function getOnboardingItem(
	onboardingState: OnboardingState,
	item: OnboardingChecklistItemName
) {
	return onboardingState[item];
}

export function getProgress(
	onboardingState: OnboardingState,
	checklistItems: OnboardingChecklistItemName[]
) {
	// check how many items of checklistItems exist, and are set to true in onboardingState
	return checklistItems.filter((item) => onboardingState[item]).length;
}
