import Clock from "@/assets/icons/clock.svg?react";
import Dataflow from "@/assets/icons/dataflow.svg?react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from "@zenml-io/react-component-library/components";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { PiplineRunVisualizationView } from "./types";

type Props = {
	activeView: PiplineRunVisualizationView;
	setActiveView: (view: PiplineRunVisualizationView) => void;
};

export function ViewSwitcher({ activeView, setActiveView }: Props) {
	return (
		<Tabs
			className="w-fit overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary"
			value={activeView}
			onValueChange={(value) => setActiveView(value as PiplineRunVisualizationView)}
		>
			<TabsList className="flex items-center">
				<TabsTrigger asChild value="dag">
					<ButtonTrigger
						data-state-active={activeView === "dag"}
						view="dag"
						activeView={activeView}
					>
						<Dataflow className="size-4 group-data-[state=active]:fill-theme-text-negative" />
						<span className="sr-only">DAG</span>
					</ButtonTrigger>
				</TabsTrigger>
				<TabsTrigger asChild value="timeline">
					<ButtonTrigger
						data-state-active={activeView === "timeline"}
						view="timeline"
						activeView={activeView}
					>
						<Clock className="size-4 group-data-[state=active]:fill-theme-text-negative" />
						<span className="sr-only">Timeline</span>
					</ButtonTrigger>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

type ButtonTriggerProps = {
	view: PiplineRunVisualizationView;

	activeView: PiplineRunVisualizationView;
};

const ButtonTrigger = forwardRef<
	ElementRef<typeof Button>,
	ComponentPropsWithoutRef<typeof Button> & ButtonTriggerProps
>(({ view, activeView, ...rest }, ref) => {
	return (
		<Button
			{...rest}
			ref={ref}
			intent={activeView === view ? "primary" : "secondary"}
			emphasis={activeView === view ? "bold" : "subtle"}
			className="group flex aspect-square size-7 items-center justify-center rounded-sharp border-none"
		>
			{rest.children}
		</Button>
	);
});

ButtonTrigger.displayName = "ButtonTrigger";
