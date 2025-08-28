import Dataflow from "@/assets/icons/dataflow.svg?react";
import Clock from "@/assets/icons/clock.svg?react";
import { Tabs, TabsList, TabsTrigger } from "@zenml-io/react-component-library/components/client";
import { ViewType } from "./PipelineVisualizationContainer";

type ViewToggleProps = {
	currentView: ViewType;
	onViewChange: (view: ViewType) => void;
};

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
	return (
		<div className="absolute right-12 top-4 z-30">
			<Tabs value={currentView} onValueChange={(value) => onViewChange(value as ViewType)}>
				<TabsList className="border border-theme-border-moderate bg-theme-surface-primary">
					<TabsTrigger value="dag" className="flex items-center gap-2">
						<Dataflow className="h-4 w-4" />
						<span className="text-text-sm">DAG</span>
					</TabsTrigger>
					<TabsTrigger value="timeline" className="flex items-center gap-2">
						<Clock className="h-4 w-4" />
						<span className="text-text-sm">Timeline</span>
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
