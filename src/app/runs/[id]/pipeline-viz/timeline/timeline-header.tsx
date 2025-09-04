import { DebouncedInput } from "@/components/debounced-input";
import { PiplineRunVisualizationView } from "../types";
import { ViewSwitcher } from "../view-switcher";

type Props = {
	setActiveView: (view: PiplineRunVisualizationView) => void;
	onSearch: (value: string) => void;
	search: string;
};

export function TimelineHeader({ onSearch, search, setActiveView }: Props) {
	return (
		<div className="flex flex-shrink-0 items-center gap-3 p-3">
			<DebouncedInput
				value={search}
				onChange={onSearch}
				placeholder="Search timeline items..."
				className="w-full max-w-[300px]"
			/>
			<ViewSwitcher activeView={"timeline"} setActiveView={setActiveView} />
		</div>
	);
}
