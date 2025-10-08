import { PlaygroundEmptyState } from "../error";

export function PlaygroundOutputsEmptyState() {
	return (
		<div className="flex h-full flex-1 rounded-md border border-dashed border-theme-border-moderate p-5">
			<PlaygroundEmptyState subtitle="Invoke a run to see its outputs" />
		</div>
	);
}
