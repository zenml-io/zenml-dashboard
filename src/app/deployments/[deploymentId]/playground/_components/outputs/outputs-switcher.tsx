import { PlaygroundViewSwitcherButton } from "@/components/deployments/playground/playground-view-switcher-button";
import { PlaygroundButtonSwitcherTabs } from "@/components/deployments/playground/playground-view-switcher-tabs";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlaygroundOutputsView } from "./types";

type Props = {
	activeView: PlaygroundOutputsView;
	setActiveView: (val: PlaygroundOutputsView) => void;
};

export function PlaygroundOutputsSwitcher({ activeView, setActiveView }: Props) {
	return (
		<PlaygroundButtonSwitcherTabs
			activeView={activeView}
			setActiveView={(val) => setActiveView(val as PlaygroundOutputsView)}
		>
			<TabsList className="flex items-center">
				<TabsTrigger asChild value="preview">
					<PlaygroundViewSwitcherButton>Preview</PlaygroundViewSwitcherButton>
				</TabsTrigger>

				<TabsTrigger asChild value="json">
					<PlaygroundViewSwitcherButton>JSON</PlaygroundViewSwitcherButton>
				</TabsTrigger>
			</TabsList>
		</PlaygroundButtonSwitcherTabs>
	);
}
