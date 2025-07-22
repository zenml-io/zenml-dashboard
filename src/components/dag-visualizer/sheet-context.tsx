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
		type: "step" | "artifact";
		id: string;
	} | null;
}

interface SheetContextValue {
	sheetState: SheetState;
	openStepSheet: (stepId: string) => void;
	openArtifactSheet: (artifactId: string) => void;
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
			closeSheet
		}),
		[sheetState, openStepSheet, openArtifactSheet, closeSheet]
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
