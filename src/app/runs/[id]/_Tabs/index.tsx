import { Button } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";
import Collapse from "@/assets/icons/collapse.svg?react";

type TabsHeaderProps = {
	setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};
export function TabsHeader({ setIsPanelOpen }: TabsHeaderProps) {
	return (
		<div className="flex items-center gap-4 border-b border-theme-border-moderate bg-theme-surface-primary px-5 py-4">
			<Button
				className="flex h-6 w-6 items-center justify-center bg-transparent p-0.5"
				intent="secondary"
				onClick={() => setIsPanelOpen(false)}
			>
				<Collapse className="h-5 w-5 fill-theme-text-secondary" />
			</Button>
			<span className="text-text-xl">Run Insights</span>
		</div>
	);
}
