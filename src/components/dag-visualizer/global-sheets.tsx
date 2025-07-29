import { useStoreApi } from "reactflow";
import { useSheetContext } from "./sheet-context";
import { StepSheetContent } from "../steps/step-sheet/SheetContent";
import { ArtifactSheetContent } from "../artifacts/artifact-node-sheet/SheetContent";
import { Sheet, SheetContent } from "@zenml-io/react-component-library/components/client";

export function GlobalSheets() {
	const { sheetState, closeSheet } = useSheetContext();
	const store = useStoreApi();
	const { addSelectedNodes } = store.getState();

	function handleOpenChange(isOpen: boolean) {
		if (!isOpen) {
			setTimeout(() => {
				addSelectedNodes([]);
			}, 100);
			closeSheet();
		}
	}

	return (
		<Sheet open={sheetState.isOpen} onOpenChange={handleOpenChange}>
			<SheetContent className="w-[1000px] overflow-y-auto">
				{sheetState.lastContent?.type === "step" && (
					<StepSheetContent stepId={sheetState.lastContent.id} />
				)}
				{sheetState.lastContent?.type === "artifact" && (
					<ArtifactSheetContent artifactVersionId={sheetState.lastContent.id} />
				)}
			</SheetContent>
		</Sheet>
	);
}
