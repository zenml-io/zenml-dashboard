import { DebouncedInput } from "@/components/debounced-input";
import { PiplineRunVisualizationView } from "../types";
import { ViewSwitcher } from "../view-switcher";
import { Button } from "@zenml-io/react-component-library/components/server";
import Refresh from "@/assets/icons/refresh.svg?react";

type Props = {
	setActiveView: (view: PiplineRunVisualizationView) => void;
	onSearch: (value: string) => void;
	search: string;
	refetchHandler: () => void;
};

export function TimelineHeader({ onSearch, search, setActiveView, refetchHandler }: Props) {
	return (
		<div className="flex flex-shrink-0 items-center gap-3 p-3">
			<DebouncedInput
				value={search}
				onChange={onSearch}
				placeholder="Search..."
				className="w-full max-w-[300px]"
			/>
			<ViewSwitcher activeView={"timeline"} setActiveView={setActiveView} />
			<Button
				className="size-7 bg-theme-surface-primary"
				onClick={() => {
					refetchHandler();
				}}
				emphasis="subtle"
				intent="secondary"
			>
				<span className="sr-only">Refresh</span>
				<Refresh className="h-5 w-5 fill-theme-text-primary" />
			</Button>
		</div>
	);
}
