import Expand from "@/assets/icons/expand.svg?react";
import { Button } from "@zenml-io/react-component-library";
import { ReactNode } from "react";

export function GlobalDagControls({ children }: { children: ReactNode }) {
	return <div className="absolute right-4 top-4 flex items-center gap-2">{children}</div>;
}

type ExpandPanelProps = {
	isCollapsed: boolean;
	handlePanelToggle: () => void;
};
export function ExpandPanelButton({ isCollapsed, handlePanelToggle }: ExpandPanelProps) {
	return (
		<Button
			aria-label="Expand details panel"
			intent="secondary"
			className={`h-7 w-7 items-center justify-center border border-neutral-300 bg-theme-surface-primary p-0.5 ${
				isCollapsed ? "flex" : "hidden"
			}`}
			onClick={handlePanelToggle}
		>
			<Expand className="h-5 w-5 fill-theme-text-primary" />
		</Button>
	);
}
