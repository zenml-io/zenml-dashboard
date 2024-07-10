import { OnboardingChecklistItemName, OnboardingResponse } from "@/types/onboarding";

export type Flow = "starter" | "production";

export function getStarterSetupItems(isLocal: boolean): OnboardingChecklistItemName[] {
	return [...(isLocal ? [] : ["device_verified" as OnboardingChecklistItemName]), "pipeline_run"];
}

function getProductionSetupItems(): OnboardingChecklistItemName[] {
	return ["stack_with_remote_orchestrator_created", "pipeline_run_with_remote_orchestrator"];
}

const finalSteps: {
	starter: OnboardingChecklistItemName;
	production: OnboardingChecklistItemName;
} = {
	starter: "starter_setup_completed",
	production: "production_setup_completed"
};

export function getStarterSetup(data: OnboardingResponse, isLocal: boolean) {
	const flowType: Flow = "starter";
	const finalStep = finalSteps[flowType];
	const itemsDone = getProgress(data, flowType, isLocal);
	const totalItems = getOnboardingLength(flowType, isLocal);
	return {
		itemsDone,
		totalItems,
		items: getStarterSetupItems(isLocal),
		isFinished: data.includes(finalStep),
		progress: (itemsDone / totalItems) * 100,
		finalStep: finalSteps.starter,
		hasItem: (item: OnboardingChecklistItemName) => hasOnboardingItem(item, data),
		getItem: (item: OnboardingChecklistItemName) => getItem(item, data, flowType)
	};
}

export function getProductionSetup(data: OnboardingResponse) {
	const flowType: Flow = "production";
	const finalStep = finalSteps[flowType];
	const itemsDone = getProgress(data, flowType);
	const totalItems = getOnboardingLength(flowType);
	return {
		itemsDone,
		totalItems,
		items: getProductionSetupItems(),
		isFinished: data.includes(finalStep),
		progress: (itemsDone / totalItems) * 100,
		finalStep: finalSteps.starter,
		hasItem: (item: OnboardingChecklistItemName) => hasOnboardingItem(item, data),
		getItem: (item: OnboardingChecklistItemName) => getItem(item, data, flowType)
	};
}

function getItem(
	item: OnboardingChecklistItemName,
	state: OnboardingResponse,
	flow: Flow,
	isLocal?: boolean
) {
	return {
		isCompleted: state.includes(item),
		hasDownStreamStep: checkDownstreamStep(item, state, "starter", isLocal || false),
		isActive: isStepActive(item, state, flow, isLocal || false)
	};
}

function hasOnboardingItem(item: OnboardingChecklistItemName, state: OnboardingResponse): boolean {
	return state.includes(item);
}

export function checkDownstreamStep(
	item: OnboardingChecklistItemName,
	state: OnboardingResponse,
	flow: Flow,
	isLocal?: boolean
) {
	const order =
		flow === "starter" ? getStarterSetupItems(isLocal || false) : getProductionSetupItems();
	const withFinalStep = [...order, finalSteps[flow]];
	const currentIndex = withFinalStep.indexOf(item);
	if (currentIndex === -1) {
		return false; // If the item is not found in the order array, return false
	}
	const downstreamSteps = withFinalStep.slice(currentIndex + 1);
	return downstreamSteps.some((step) => state.includes(step));
}

function isStepActive(
	step: OnboardingChecklistItemName,
	state: OnboardingResponse,
	flowType: Flow,
	isLocal: boolean
): boolean {
	const flow = flowType === "starter" ? getStarterSetupItems(isLocal) : getProductionSetupItems();
	if (flow.length === 0) {
		return false;
	}

	const stepIndex = flow.indexOf(step);

	if (stepIndex === -1) {
		// Step is not in the setup list
		return false;
	}

	if (state.includes(step)) {
		// Step is already done
		return false;
	}

	if (stepIndex === 0) {
		// First step is active if not done
		return true;
	}

	// Check if the previous step is done
	const previousStep = flow[stepIndex - 1];
	return state.includes(previousStep);
}

export function getProgress(onboardingState: OnboardingResponse, flow: Flow, isLocal?: boolean) {
	const items =
		flow === "starter" ? getStarterSetupItems(isLocal || false) : getProductionSetupItems();
	const finalStep = finalSteps[flow];
	// Filter out the finalStep from the checklist items
	const filteredItems = items.filter((item) => item !== finalStep);

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

export function getOnboardingLength(flow: Flow, isLocal?: boolean) {
	const items =
		flow === "starter" ? getStarterSetupItems(isLocal || false) : getProductionSetupItems();
	return items.length;
}
