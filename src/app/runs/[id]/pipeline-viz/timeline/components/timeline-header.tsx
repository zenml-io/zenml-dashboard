import Refresh from "@/assets/icons/refresh.svg?react";
import Search from "@/assets/icons/search.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { Button } from "@zenml-io/react-component-library/components/server";
import { PiplineRunVisualizationView } from "../../types";
import { ViewSwitcher } from "../../view-switcher";

type Props = {
	setActiveView: (view: PiplineRunVisualizationView) => void;
	onSearch: (value: string) => void;
	search: string;
	refetchHandler: () => void;
};

export function TimelineHeader({ onSearch, search, setActiveView, refetchHandler }: Props) {
	return (
		<div className="flex flex-shrink-0 items-center gap-3 p-3">
			<div className="relative">
				<DebouncedInput
					value={search}
					onChange={onSearch}
					placeholder="Search..."
					className="w-full max-w-[300px] pl-[36px]"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-1">
					<Search className="size-4 fill-neutral-400" />
				</div>
			</div>
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
