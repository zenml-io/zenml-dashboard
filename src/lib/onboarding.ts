import { OnboardingChecklistItemName, OnboardingState } from "@/types/onboarding";
import { ServerSettings } from "@/types/server";

export function getOnboardingState(data: ServerSettings) {
	return data.metadata?.onboarding_state as OnboardingState;
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
	return checklistItems.filter((item) => onboardingState[item]).length;
}
