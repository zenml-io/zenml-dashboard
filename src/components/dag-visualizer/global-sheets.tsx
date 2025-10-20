import { Sheet } from "@zenml-io/react-component-library/components/client";
import { ErrorBoundary } from "react-error-boundary";
import { useStoreApi } from "reactflow";
import { ArtifactSheetContent } from "../artifacts/artifact-node-sheet/SheetContent";
import { BorderErrorFallback, RunSheet } from "../runs/run-sheet";
import { ResizableSheetContent } from "../sheet/resizable-sheet";
import { StepSheetContent } from "../steps/step-sheet/SheetContent";
import { useSheetContext } from "./sheet-context";

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

	function getAutoSaveId() {
		return `run-resizable-${sheetState.lastContent?.type}-sheet`;
	}

	return (
		<Sheet open={sheetState.isOpen} onOpenChange={handleOpenChange}>
			<ResizableSheetContent
				handleSheetClose={() => handleOpenChange(false)}
				autoSaveId={getAutoSaveId()}
			>
				{sheetState.lastContent?.type === "step" && (
					<StepSheetContent stepId={sheetState.lastContent.id} />
				)}
				{sheetState.lastContent?.type === "artifact" && (
					<ArtifactSheetContent artifactVersionId={sheetState.lastContent.id} />
				)}
				{sheetState.lastContent?.type === "triggered_run" && (
					<ErrorBoundary fallbackRender={BorderErrorFallback}>
						<RunSheet runId={sheetState.lastContent.id} />
					</ErrorBoundary>
				)}
			</ResizableSheetContent>
		</Sheet>
	);
}
