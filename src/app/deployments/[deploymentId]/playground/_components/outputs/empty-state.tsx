import { PlaygroundEmptyState } from "../error";

export function PlaygroundOutputsEmptyState() {
	return (
		<div className="flex h-full flex-1 rounded-md border border-dashed border-theme-border-moderate py-5 pl-5 pr-5 xl:pr-0">
			<PlaygroundEmptyState subtitle="Invoke a run to see its outputs" />
		</div>
	);
}
