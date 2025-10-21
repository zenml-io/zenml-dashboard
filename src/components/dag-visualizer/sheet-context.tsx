import { NodeTypes } from "@/types/dag-visualizer";
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react";

interface SheetState {
	isOpen: boolean;
	lastContent: {
		type: Extract<NodeTypes, "step" | "artifact" | "triggered_run">;
		id: string;
	} | null;
}

interface SheetContextValue {
	sheetState: SheetState;
	openStepSheet: (stepId: string) => void;
	openArtifactSheet: (artifactId: string) => void;
	openTriggeredRunSheet: (runId: string) => void;
	closeSheet: () => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

export function SheetProvider({ children }: PropsWithChildren) {
	const [sheetState, setSheetState] = useState<SheetState>({
		isOpen: false,
		lastContent: null
	});

	const openStepSheet = useCallback((stepId: string) => {
		setSheetState({
			isOpen: true,
			lastContent: { type: "step", id: stepId }
		});
	}, []);

	const openTriggeredRunSheet = useCallback((runId: string) => {
		setSheetState({
			isOpen: true,
			lastContent: { type: "triggered_run", id: runId }
		});
	}, []);

	const openArtifactSheet = useCallback((artifactId: string) => {
		setSheetState({
			isOpen: true,
			lastContent: { type: "artifact", id: artifactId }
		});
	}, []);

	const closeSheet = useCallback(() => {
		setSheetState((prev) => ({
			...prev,
			isOpen: false
			// Keep lastContent - it persists through the closing animation
		}));
	}, []);

	const value = useMemo(
		() => ({
			sheetState,
			openStepSheet,
			openArtifactSheet,
			openTriggeredRunSheet,
			closeSheet
		}),
		[sheetState, openStepSheet, openArtifactSheet, openTriggeredRunSheet, closeSheet]
	);

	return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export function useSheetContext() {
	const context = useContext(SheetContext);
	if (!context) {
		throw new Error("useSheetContext must be used within a SheetProvider");
	}
	return context;
}
