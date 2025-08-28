import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import {
	ExecutionStatusIcon,
	getExecutionStatusBackgroundColor
} from "@/components/ExecutionStatus";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
import { secondsToTimeString } from "@/lib/dates";
import { StepNodePayload } from "@/types/dag-visualizer";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";
import { TimelineSearch } from "./TimelineSearch";
import { useDag } from "./useDag";

interface TimelineStep {
	id: string;
	name: string;
	status: StepNodePayload["status"];
	duration?: number;
	startTime?: number;
	endTime?: number;
}

export function PipelineTimeline() {
	const { dagQuery, nodes } = useDag();
	const [searchTerm, setSearchTerm] = useState("");

	const timelineData = useMemo(() => {
		if (!dagQuery.data || !nodes.length) return null;

		const stepNodes = nodes.filter((node) => node.type === "step") as Array<{
			id: string;
			data: StepNodePayload;
		}>;

		if (!stepNodes.length) return null;

		const steps: TimelineStep[] = stepNodes.map((node) => ({
			id: node.data.step_id,
			name: node.data.step_name,
			status: node.data.status,
			duration: node.data.duration
		}));

		// Filter steps based on search term
		const filteredSteps = searchTerm
			? steps.filter((step) => step.name.toLowerCase().includes(searchTerm.toLowerCase()))
			: steps;

		// Calculate timeline positioning for all steps first to maintain proportions
		let currentStart = 0;
		const allStepsWithTiming = steps.map((step) => {
			const startTime = currentStart;
			const duration = step.duration || 0;
			const endTime = startTime + duration;
			currentStart = endTime; // Sequential for now - could be parallel in reality

			return {
				...step,
				startTime,
				endTime
			};
		});

		const totalDuration =
			allStepsWithTiming.length > 0 ? Math.max(...allStepsWithTiming.map((s) => s.endTime)) : 0;

		// Filter the steps with timing but keep original proportions
		const filteredStepsWithTiming = allStepsWithTiming.filter((step) =>
			searchTerm ? step.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
		);

		return {
			steps: filteredStepsWithTiming,
			totalDuration,
			totalSteps: steps.length,
			filteredCount: filteredStepsWithTiming.length
		};
	}, [dagQuery.data, nodes, searchTerm]);

	if (dagQuery.isError) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">There was an error loading the timeline visualization.</p>
			</EmptyState>
		);
	}

	if (dagQuery.isPending || !timelineData) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading Timeline Visualization</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full w-full overflow-auto bg-theme-surface-primary p-4">
			<div className="min-h-full">
				<div className="mb-4">
					<h3 className="text-text-lg font-semibold text-theme-text-primary">Pipeline Timeline</h3>
					<p className="text-text-sm text-theme-text-secondary">
						Total Duration: {secondsToTimeString(timelineData.totalDuration)}
					</p>
				</div>

				<div className="mb-4">
					<TimelineSearch onSearchChange={setSearchTerm} matchCount={timelineData.filteredCount} />
				</div>

				<div className="overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary">
					{timelineData.steps.map((step, index) => (
						<TimelineRow
							key={step.id}
							step={step}
							totalDuration={timelineData.totalDuration}
							index={index}
							isLast={index === timelineData.steps.length - 1}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

interface TimelineRowProps {
	step: TimelineStep;
	totalDuration: number;
	index: number;
	isLast: boolean;
}

function TimelineRow({ step, totalDuration, index, isLast }: TimelineRowProps) {
	const { openStepSheet } = useSheetContext();

	function handleClick() {
		openStepSheet(step.id);
	}
	const startPercentage = totalDuration > 0 ? (step.startTime! / totalDuration) * 100 : 0;
	const widthPercentage = totalDuration > 0 ? ((step.duration || 0) / totalDuration) * 100 : 0;

	return (
		<button
			onClick={handleClick}
			className={`flex w-full items-center gap-4 bg-theme-surface-primary p-3 text-left transition-colors hover:bg-theme-surface-secondary focus:bg-theme-surface-secondary focus:outline-none ${
				!isLast ? "border-b border-theme-border-moderate" : ""
			}`}
		>
			{/* Step Info */}
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100">
					<span className="text-text-sm font-medium text-theme-text-secondary">{index + 1}</span>
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<div className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(step.status)}`}>
							<ExecutionStatusIcon status={step.status} className="h-3 w-3 shrink-0" />
						</div>
						<p className="truncate font-semibold text-theme-text-primary">{step.name}</p>
					</div>
					<p className="text-text-sm text-theme-text-tertiary">
						Duration: {step.duration ? secondsToTimeString(step.duration) : "N/A"}
					</p>
				</div>
			</div>

			{/* Timeline Bar */}
			<div className="relative h-6 w-1/2 overflow-hidden rounded-sm bg-neutral-100">
				{step.duration && step.duration > 0 && (
					<div
						className={`absolute top-0 h-full rounded-sm transition-all duration-300 ${getExecutionStatusBackgroundColor(step.status)}`}
						style={{
							left: `${startPercentage}%`,
							width: `${Math.max(widthPercentage, 2)}%` // Minimum 2% width for visibility
						}}
					/>
				)}
			</div>
		</button>
	);
}
