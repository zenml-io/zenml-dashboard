import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import { ArtifactIcon } from "@/components/ArtifactIcon";
import { EmptyState } from "@/components/EmptyState";
import {
	ExecutionStatusIcon,
	getExecutionStatusBackgroundColor
} from "@/components/ExecutionStatus";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
import { SearchField } from "@/components/SearchField";
import { secondsToTimeString } from "@/lib/dates";
import { StepNodePayload } from "@/types/dag-visualizer";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";
import { useDag } from "./useDag";

interface ArtifactInfo {
	id: string;
	name: string;
	type: string;
}

interface TimelineStep {
	id: string;
	name: string;
	status: StepNodePayload["status"];
	duration?: number;
	startTime?: number;
	endTime?: number;
	inputArtifacts: ArtifactInfo[];
	outputArtifacts: ArtifactInfo[];
	isPreview?: boolean;
}

export function PipelineTimeline() {
	const { dagQuery, nodes, edges } = useDag();
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

	const timelineData = useMemo(() => {
		if (!dagQuery.data || !nodes.length) return null;

		const stepNodes = nodes.filter((node) => node.type === "step") as Array<{
			id: string;
			data: StepNodePayload;
		}>;
		const previewStepNodes = nodes.filter((node) => node.type === "previewStep") as Array<{
			id: string;
			data: { node_name: string; runStatus: string };
		}>;
		const artifactNodes = nodes.filter((node) => node.type === "artifact") as Array<{
			id: string;
			data: { artifact_id: string; artifact_name: string; type: string };
		}>;

		if (!stepNodes.length && !previewStepNodes.length) return null;

		// Build artifact lookup
		const artifactLookup = new Map<string, ArtifactInfo>();
		artifactNodes.forEach((node) => {
			artifactLookup.set(node.id, {
				id: node.data.artifact_id,
				name: node.data.artifact_name,
				type: node.data.type
			});
		});

		// Process regular steps
		const regularSteps: TimelineStep[] = stepNodes.map((node) => {
			// Find input artifacts (edges FROM artifacts TO this step)
			const inputArtifacts: ArtifactInfo[] = edges
				.filter((edge) => edge.target === node.id)
				.map((edge) => artifactLookup.get(edge.source))
				.filter(Boolean) as ArtifactInfo[];

			// Find output artifacts (edges FROM this step TO artifacts)
			const outputArtifacts: ArtifactInfo[] = edges
				.filter((edge) => edge.source === node.id)
				.map((edge) => artifactLookup.get(edge.target))
				.filter(Boolean) as ArtifactInfo[];

			return {
				id: node.data.step_id,
				name: node.data.step_name,
				status: node.data.status,
				duration: node.data.duration,
				inputArtifacts,
				outputArtifacts,
				isPreview: false
			};
		});

		// Process preview steps (future/not-started steps)
		const previewSteps: TimelineStep[] = previewStepNodes.map((node) => {
			// Preview steps typically don't have artifacts in the current run
			const inputArtifacts: ArtifactInfo[] = [];
			const outputArtifacts: ArtifactInfo[] = [];

			// Determine preview step status based on run status
			let status: StepNodePayload["status"] = "initializing";
			if (node.data.runStatus === "failed") {
				status = "failed";
			} else if (node.data.runStatus === "stopped") {
				status = "stopped";
			}

			return {
				id: node.id, // Use node.id since preview steps don't have step_id
				name: node.data.node_name,
				status,
				duration: undefined, // No duration for preview steps
				inputArtifacts,
				outputArtifacts,
				isPreview: true
			};
		});

		const steps = [...regularSteps, ...previewSteps];

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
		<div className="h-full w-full overflow-auto bg-theme-surface-primary">
			<div className="sticky top-0 z-10 border-b border-theme-border-moderate bg-theme-surface-primary p-4 pb-2">
				<div className="mb-4">
					<h3 className="text-text-lg font-semibold text-theme-text-primary">Pipeline Timeline</h3>
					<p className="text-text-sm text-theme-text-secondary">
						Total Duration: {secondsToTimeString(timelineData.totalDuration)}
					</p>
				</div>

				<SearchField
					searchParams={{}}
					inMemoryHandler={setSearchTerm}
					placeholder="Search steps..."
				/>
			</div>

			<div className="p-2">
				<div className="overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary">
					{timelineData.steps.map((step, index) => (
						<TimelineRow
							key={step.id}
							step={step}
							totalDuration={timelineData.totalDuration}
							index={index}
							isLast={index === timelineData.steps.length - 1}
							isExpanded={expandedSteps.has(step.id)}
							onToggleExpand={() => {
								const newExpanded = new Set(expandedSteps);
								if (expandedSteps.has(step.id)) {
									newExpanded.delete(step.id);
								} else {
									newExpanded.add(step.id);
								}
								setExpandedSteps(newExpanded);
							}}
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
	isExpanded: boolean;
	onToggleExpand: () => void;
}

function TimelineRow({
	step,
	totalDuration,
	index,
	isLast,
	isExpanded,
	onToggleExpand
}: TimelineRowProps) {
	const { openStepSheet, openArtifactSheet } = useSheetContext();
	const startPercentage = totalDuration > 0 ? (step.startTime! / totalDuration) * 100 : 0;
	const widthPercentage = totalDuration > 0 ? ((step.duration || 0) / totalDuration) * 100 : 0;

	const hasArtifacts = step.inputArtifacts.length > 0 || step.outputArtifacts.length > 0;

	function handleStepClick() {
		if (!step.isPreview) {
			openStepSheet(step.id);
		}
		// Preview steps don't open step sheets since they haven't executed
	}

	function handleArtifactClick(e: React.MouseEvent, artifactId: string) {
		e.stopPropagation();
		openArtifactSheet(artifactId);
	}

	return (
		<div
			className={`bg-theme-surface-primary ${!isLast ? "border-b border-theme-border-moderate" : ""} ${
				step.isPreview ? "opacity-50" : ""
			}`}
		>
			{/* Main Row */}
			<div className="flex w-full items-center gap-3 p-2">
				{/* Expand Button */}
				<button
					onClick={onToggleExpand}
					disabled={!hasArtifacts}
					className={`shrink-0 p-1 transition-colors ${
						hasArtifacts
							? "text-theme-text-secondary hover:text-theme-text-primary"
							: "cursor-default text-transparent"
					}`}
				>
					{hasArtifacts &&
						(isExpanded ? (
							<ChevronDown className="h-4 w-4" />
						) : (
							<ChevronRight className="h-4 w-4" />
						))}
				</button>

				{/* Step Info */}
				<button
					onClick={handleStepClick}
					disabled={step.isPreview}
					className={`rounded -m-1 flex min-w-0 flex-1 items-center gap-2 p-1 text-left transition-colors focus:outline-none ${
						step.isPreview
							? "cursor-default"
							: "hover:bg-theme-surface-secondary focus:bg-theme-surface-secondary"
					}`}
				>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-2">
							<div className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(step.status)}`}>
								<ExecutionStatusIcon status={step.status} className="h-3 w-3 shrink-0" />
							</div>
							<p className="truncate font-semibold text-theme-text-primary">{step.name}</p>
						</div>
						<p className="text-text-sm text-theme-text-tertiary">
							{step.isPreview ? (
								<span>
									{step.status === "failed"
										? "Will not execute due to upstream error"
										: step.status === "stopped"
											? "Not executed - run was stopped"
											: "Pending execution"}
								</span>
							) : (
								<span>
									Duration:{" "}
									{step.status === "running"
										? "Running..."
										: step.duration === 0
											? "Cached"
											: step.duration
												? secondsToTimeString(step.duration)
												: "N/A"}
								</span>
							)}
						</p>
					</div>
				</button>

				{/* Timeline Bar */}
				<div className="relative h-6 w-1/2 overflow-hidden rounded-sm bg-neutral-100">
					{step.isPreview ? (
						// Preview steps show as a dashed placeholder
						<div className="absolute top-0 h-full w-full border-2 border-dashed border-theme-border-moderate opacity-50" />
					) : (
						step.duration !== undefined &&
						step.duration !== null && (
							<div
								className={`absolute top-0 h-full rounded-sm transition-all duration-300 ${getExecutionStatusBackgroundColor(step.status)}`}
								style={{
									left: `${startPercentage}%`,
									width: step.duration === 0 ? "1px" : `${Math.max(widthPercentage, 2)}%`
								}}
							/>
						)
					)}
				</div>
			</div>

			{/* Expanded Artifacts */}
			{isExpanded && hasArtifacts && (
				<div className="border-theme-border-subtle border-t bg-theme-surface-secondary px-8 py-3">
					{/* Input Artifacts */}
					{step.inputArtifacts.length > 0 && (
						<div className="mb-3">
							<h4 className="mb-2 text-text-sm font-medium text-theme-text-secondary">
								Input Artifacts ({step.inputArtifacts.length})
							</h4>
							<div className="flex flex-wrap gap-2">
								{step.inputArtifacts.map((artifact) => (
									<button
										key={artifact.id}
										onClick={(e) => handleArtifactClick(e, artifact.id)}
										className="rounded flex items-center gap-2 border border-theme-border-moderate bg-theme-surface-primary px-2 py-1 text-left transition-colors hover:bg-theme-surface-secondary"
									>
										<ArtifactIcon
											className="h-3 w-3 fill-theme-text-secondary"
											artifactType={artifact.type}
										/>
										<span className="text-text-sm text-theme-text-primary">{artifact.name}</span>
									</button>
								))}
							</div>
						</div>
					)}

					{/* Output Artifacts */}
					{step.outputArtifacts.length > 0 && (
						<div>
							<h4 className="mb-2 text-text-sm font-medium text-theme-text-secondary">
								Output Artifacts ({step.outputArtifacts.length})
							</h4>
							<div className="flex flex-wrap gap-2">
								{step.outputArtifacts.map((artifact) => (
									<button
										key={artifact.id}
										onClick={(e) => handleArtifactClick(e, artifact.id)}
										className="rounded flex items-center gap-2 border border-theme-border-moderate bg-theme-surface-primary px-2 py-1 text-left transition-colors hover:bg-theme-surface-secondary"
									>
										<ArtifactIcon
											className="h-3 w-3 fill-theme-text-secondary"
											artifactType={artifact.type}
										/>
										<span className="text-text-sm text-theme-text-primary">{artifact.name}</span>
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
