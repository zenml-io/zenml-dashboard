import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react";

/**
 * Maintains per-visualization UI state (currently, Markdown render mode) scoped to the lifetime
 * of the Artifact Sheet. We keep state by visualization index because the list is stable during
 * a session, and we don't want to leak this UI-only preference across sheets/artifacts.
 */
export type MarkdownMode = "preview" | "raw";

export type VisualizationUIStateContextProps = {
	getMarkdownMode: (index: number) => MarkdownMode;
	setMarkdownMode: (index: number, mode: MarkdownMode) => void;
};

const VisualizationUIStateContext = createContext<VisualizationUIStateContextProps | null>(null);

export function VisualizationUIStateProvider({ children }: PropsWithChildren) {
	// Persist only non-default states to keep memory small; default is "preview"
	const [markdownModes, setMarkdownModes] = useState<Map<number, MarkdownMode>>(new Map());

	// Returns the saved mode for an index, defaulting to "preview" when no explicit choice was made.
	// Memoized to avoid creating a new function identity when state hasn't changed.
	const getMarkdownMode = useCallback(
		(index: number): MarkdownMode => {
			return markdownModes.get(index) ?? "preview";
		},
		[markdownModes]
	);

	// Stores only deviations from default ("preview") to keep the map small.
	// Memoized to ensure downstream consumers don't re-render due to new function identities.
	const setMarkdownMode = useCallback(
		(index: number, mode: MarkdownMode): void => {
			setMarkdownModes((prev) => {
				const next = new Map(prev);
				if (mode === "preview") {
					next.delete(index);
				} else {
					next.set(index, mode);
				}
				return next;
			});
		},
		[setMarkdownModes]
	);

	const value = useMemo(
		() => ({
			getMarkdownMode,
			setMarkdownMode
		}),
		[getMarkdownMode, setMarkdownMode]
	);

	return (
		<VisualizationUIStateContext.Provider value={value}>
			{children}
		</VisualizationUIStateContext.Provider>
	);
}

export function useVisualizationUIState() {
	const ctx = useContext(VisualizationUIStateContext);
	if (!ctx) {
		throw new Error("useVisualizationUIState must be used within a VisualizationUIStateProvider");
	}
	return ctx;
}
