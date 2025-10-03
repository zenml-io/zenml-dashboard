import { Button } from "@zenml-io/react-component-library";
import { useVisualizationUIState } from "@/context/VisualizationUIStateContext";

type Props = {
	index: number;
};

/**
 * Toolbar control to switch Markdown rendering mode for the active visualization index.
 * Uses design-system Button props to convey selection state instead of custom background classes.
 * aria-pressed is applied to improve screen-reader announcement of the toggle state.
 */
export function MarkdownViewToggle({ index }: Props) {
	const { getMarkdownMode, setMarkdownMode } = useVisualizationUIState();
	const mode = getMarkdownMode(index);
	const isPreview = mode === "preview";
	const isRaw = mode === "raw";

	return (
		<div className="flex items-center gap-1">
			<Button
				size="md"
				intent={isPreview ? "primary" : "secondary"}
				emphasis="subtle"
				aria-pressed={isPreview}
				onClick={() => setMarkdownMode(index, "preview")}
			>
				Preview
			</Button>
			<Button
				size="md"
				intent={isRaw ? "primary" : "secondary"}
				emphasis="subtle"
				aria-pressed={isRaw}
				onClick={() => setMarkdownMode(index, "raw")}
			>
				Raw
			</Button>
		</div>
	);
}
