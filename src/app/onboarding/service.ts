import { OnboardingChecklistItemName, OnboardingState } from "@/types/onboarding";
import { ServerSettings } from "@/types/server";

export function getStarterSetup(serverSettings: ServerSettings) {
	return (serverSettings.body?.onboarding_state as OnboardingState).starterSetup;
}

export function getStarterSetupItem(
	starterSetup: OnboardingChecklistItemName[],
	item: OnboardingChecklistItemName
) {
	return starterSetup.find((el) => el === item);
}
