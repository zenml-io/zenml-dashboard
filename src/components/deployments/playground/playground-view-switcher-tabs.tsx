import { Tabs } from "@radix-ui/react-tabs";
import { cn } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef } from "react";

type PlaygroundButtonSwitcherTabsProps = ComponentPropsWithoutRef<typeof Tabs> & {
	activeView: string;
	setActiveView: (view: string) => void;
};

export function PlaygroundButtonSwitcherTabs({
	activeView,
	setActiveView,
	className,
	children
}: PlaygroundButtonSwitcherTabsProps) {
	return (
		<Tabs
			className={cn(
				"w-fit overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary",
				className
			)}
			value={activeView}
			onValueChange={(value) => setActiveView(value)}
		>
			{children}
		</Tabs>
	);
}
