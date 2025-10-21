import { useSheetContext } from "@/components/dag-visualizer/sheet-context";

export function useTimelineItem(stepId: string | undefined) {
	const { openStepSheet, sheetState } = useSheetContext();

	const isSelected = sheetState.lastContent?.id === stepId && sheetState.isOpen;

	function handleClick() {
		if (!stepId) return;
		openStepSheet(stepId);
	}

	return {
		isSelected,
		handleClick
	};
}
