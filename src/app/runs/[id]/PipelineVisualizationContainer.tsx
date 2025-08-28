import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import AlertTriangle from "@/assets/icons/alert-triangle.svg?react";
import Info from "@/assets/icons/info.svg?react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	Button,
	useToast
} from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { DAG } from "./Dag";
import { PipelineTimeline } from "./PipelineTimeline";
import { useDag } from "./useDag";
import { ViewToggle } from "./ViewToggle";

export type ViewType = "dag" | "timeline";

const LARGE_PIPELINE_THRESHOLD = 50;

interface PipelineVisualizationContainerProps {
	isPanelOpen?: boolean;
}

export function PipelineVisualizationContainer(_props: PipelineVisualizationContainerProps) {
	const { dagQuery } = useDag();
	const { toast } = useToast();

	const [view, setView] = useState<ViewType>("dag");
	const [hasAutoSwitched, setHasAutoSwitched] = useState(false);
	const [stepCount, setStepCount] = useState(0);
	const [showDagWarning, setShowDagWarning] = useState(false);
	const [pendingView, setPendingView] = useState<ViewType | null>(null);

	// Calculate step count when data is loaded
	useEffect(() => {
		if (dagQuery.isSuccess && dagQuery.data && dagQuery.data.nodes) {
			const rawStepNodes = dagQuery.data.nodes.filter(
				(node: { type: string }) => node.type === "step"
			);
			setStepCount(rawStepNodes.length);
		}
	}, [dagQuery.isSuccess, dagQuery.data]);

	// Auto-switch to timeline view for large pipelines
	useEffect(() => {
		if (stepCount > LARGE_PIPELINE_THRESHOLD && !hasAutoSwitched) {
			setView("timeline");
			setHasAutoSwitched(true);

			// Show toast notification
			toast({
				status: "default",
				emphasis: "subtle",
				icon: <Info className="h-5 w-5 shrink-0 fill-theme-text-brand" />,
				description: `Timeline view activated for better performance (${stepCount} steps).`,
				rounded: true
			});
		}
	}, [stepCount, hasAutoSwitched, toast]);

	// Handle manual view changes
	const handleViewChange = (newView: ViewType) => {
		// Show warning dialog when switching to DAG view with many steps
		if (newView === "dag" && stepCount > LARGE_PIPELINE_THRESHOLD) {
			setPendingView(newView);
			setShowDagWarning(true);
			return;
		}

		setView(newView);
	};

	// Handle warning dialog confirmation
	const handleDagWarningConfirm = () => {
		if (pendingView) {
			setView(pendingView);
			setPendingView(null);
		}
		setShowDagWarning(false);
	};

	return (
		<>
			<SheetProvider>
				<div className="relative h-full w-full">
					<ViewToggle currentView={view} onViewChange={handleViewChange} />
					{view === "dag" ? <DAG /> : <PipelineTimeline />}
				</div>
				<GlobalSheets />
			</SheetProvider>

			{/* Warning dialog for switching to DAG view with large pipelines */}
			<AlertDialog open={showDagWarning} onOpenChange={setShowDagWarning}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Switch to DAG View?</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="p-5">
						<div className="flex gap-3">
							<AlertTriangle className="h-5 w-5 shrink-0 fill-warning-700" />
							<div className="text-theme-text-secondary">
								<p>
									This pipeline has{" "}
									<strong className="text-theme-text-primary">{stepCount} steps</strong>.
								</p>
								<p className="mt-2">
									The DAG view may be slow or difficult to navigate with this many nodes. Timeline
									view is recommended for better performance.
								</p>
								<p className="mt-2">Are you sure you want to switch to DAG view?</p>
							</div>
						</div>
					</div>
					<AlertDialogFooter className="gap-[10px]">
						<AlertDialogCancel asChild>
							<Button size="sm" intent="primary">
								Stay in Timeline
							</Button>
						</AlertDialogCancel>
						<Button size="sm" intent="secondary" onClick={handleDagWarningConfirm}>
							Switch to DAG
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
