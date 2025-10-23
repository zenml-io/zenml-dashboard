import { PlaygroundOutputsSwitcher } from "./outputs-switcher";
import { PlaygroundOutputsView } from "./types";

type Props = {
	activeView: PlaygroundOutputsView;
	setActiveView: (view: PlaygroundOutputsView) => void;
};

export function PlaygroundOutputsHeader({ activeView, setActiveView }: Props) {
	return (
		<div className="flex items-center justify-between">
			<p className="text-text-lg font-semibold">Output</p>
			<PlaygroundOutputsSwitcher activeView={activeView} setActiveView={setActiveView} />
		</div>
	);
}
