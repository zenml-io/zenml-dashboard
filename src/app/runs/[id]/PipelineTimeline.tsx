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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { useMemo, useState } from "react";
import { useDag } from "./useDag";

interface ArtifactInfo {
	id: string;
	name: string;
	type: string;
	version?: string;
	dataType?: string;
	createdAt?: string;
}

interface TimelineStep {
	id: string;
	name: string;
	status: StepNodePayload["status"];
	duration?: number;
	startTime?: number;
	endTime?: number;
	actualStartTime?: string; // ISO timestamp
	actualEndTime?: string; // ISO timestamp
	inputArtifacts: ArtifactInfo[];
	outputArtifacts: ArtifactInfo[];
	isPreview?: boolean;
}

export function PipelineTimeline() {
	const { dagQuery, nodes, edges } = useDag();
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

	const timelineData = useMemo(() => {
		// Use raw DAG data instead of waiting for computed ReactFlow nodes
		if (!dagQuery.data || !dagQuery.data.nodes) return null;

		const rawNodes = dagQuery.data.nodes;
		const rawEdges = dagQuery.data.edges || [];

		// Helper functions to match DAG computation logic
		const isStepNode = (node: any) => node.type === "step";
		const isPreviewNode = (node: any) => !node.id;
		const isArtifactNode = (node: any) => node.type === "artifact";

		// Filter raw nodes by type using explicit helper functions
		const stepNodes = rawNodes.filter(isStepNode).filter((node) => !isPreviewNode(node)); // Real steps
		const previewStepNodes = rawNodes.filter(isStepNode).filter(isPreviewNode); // Preview steps
		const artifactNodes = rawNodes.filter(isArtifactNode);

		if (!stepNodes.length && !previewStepNodes.length) return null;

		// Build artifact lookup using raw nodes
		const artifactLookup = new Map<string, ArtifactInfo>();
		artifactNodes.forEach((node) => {
			if (node.node_id) {
				const metadata = node.metadata as any;
				artifactLookup.set(node.node_id, {
					id: node.id!, // artifact ID
					name: node.name,
					type: metadata?.type || "unknown",
					version: metadata?.version,
					dataType: metadata?.data_type,
					createdAt: metadata?.created_at
				});
			}
		});

		// Process regular steps using raw nodes
		const regularSteps: TimelineStep[] = stepNodes.map((node) => {
			// Find input artifacts (edges FROM artifacts TO this step)
			const inputArtifacts: ArtifactInfo[] = rawEdges
				.filter((edge) => edge.target === node.node_id)
				.map((edge) => artifactLookup.get(edge.source))
				.filter(Boolean) as ArtifactInfo[];

			// Find output artifacts (edges FROM this step TO artifacts)
			const outputArtifacts: ArtifactInfo[] = rawEdges
				.filter((edge) => edge.source === node.node_id)
				.map((edge) => artifactLookup.get(edge.target))
				.filter(Boolean) as ArtifactInfo[];

			const metadata = node.metadata as any;
			return {
				id: node.id!,
				name: node.name,
				status: metadata?.status || "completed",
				duration: metadata?.duration,
				actualStartTime: metadata?.start_time,
				actualEndTime: metadata?.end_time,
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
			if (dagQuery.data?.status === "failed") {
				status = "failed";
			} else if (dagQuery.data?.status === "stopped") {
				status = "stopped";
			}

			return {
				id: node.node_id!, // Use node_id for preview steps
				name: node.name,
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

		// Calculate timeline positioning using actual timestamps for parallel execution
		const allStepsWithTiming = steps.map((step) => {
			if (step.isPreview) {
				// Preview steps don't have timestamps
				return {
					...step,
					startTime: 0,
					endTime: 0
				};
			}

			// Use actual timestamps if available, otherwise fall back to relative positioning
			if (step.actualStartTime && step.actualEndTime) {
				try {
					const startTimestamp = new Date(step.actualStartTime).getTime();
					const endTimestamp = new Date(step.actualEndTime).getTime();

					// Validate that timestamps are valid numbers
					if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
						throw new Error("Invalid timestamp");
					}

					return {
						...step,
						startTime: startTimestamp,
						endTime: endTimestamp
					};
				} catch (error) {
					// Failed to parse timestamps, fall through to next condition
				}
			}

			if (step.actualStartTime && step.duration) {
				try {
					// If we only have start time and duration
					const startTimestamp = new Date(step.actualStartTime).getTime();

					if (isNaN(startTimestamp)) {
						throw new Error("Invalid start timestamp");
					}

					const endTimestamp = startTimestamp + (step.duration ?? 0) * 1000; // Convert seconds to ms
					return {
						...step,
						startTime: startTimestamp,
						endTime: endTimestamp
					};
				} catch (error) {
					// Failed to parse start timestamp, fall through to fallback
				}
			} else {
				// Fallback: no timestamps available, use 0 (will need special handling)
				return {
					...step,
					startTime: 0,
					endTime: step.duration ? step.duration * 1000 : 0
				};
			}
		});

		// Find the earliest start time and latest end time for the timeline bounds
		const stepsWithTimestamps = allStepsWithTiming.filter((s) => !s.isPreview && s.startTime > 0);
		if (stepsWithTimestamps.length === 0) {
			// No real timestamps, fall back to sequential layout
			let sequentialTime = 0;
			allStepsWithTiming.forEach((step) => {
				if (!step) return;
				if (!step.isPreview) {
					step.startTime = sequentialTime;
					step.endTime = sequentialTime + (step.duration || 0);
					sequentialTime = step.endTime;
				}
			});
		} else {
			// Calculate relative positions based on actual timeline bounds
			const earliestStart = Math.min(...stepsWithTimestamps.map((s) => s.startTime));
			const latestEnd = Math.max(...stepsWithTimestamps.map((s) => s.endTime));

			// Normalize timestamps to start from 0
			allStepsWithTiming.forEach((step) => {
				if (!step) return;
				if (!step.isPreview && step.startTime > 0) {
					step.startTime = step.startTime - earliestStart;
					step.endTime = step.endTime - earliestStart;
				}
			});
		}

		// Calculate total duration with proper error handling
		const nonPreviewSteps = allStepsWithTiming.filter((s) => !s.isPreview);
		const endTimes = nonPreviewSteps
			.map((s) => s.endTime)
			.filter((time) => typeof time === "number" && !isNaN(time));
		const totalDuration = endTimes.length > 0 ? Math.max(...endTimes) : 0;

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
	}, [dagQuery.data, searchTerm]);

	if (dagQuery.isError) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">There was an error loading the timeline visualization.</p>
			</EmptyState>
		);
	}

	if (dagQuery.isPending || dagQuery.isLoading || (!dagQuery.data && !dagQuery.isError)) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading Timeline Visualization</p>
				</div>
			</div>
		);
	}

	// If we have data but no timelineData, there might be no steps
	if (dagQuery.data && !timelineData) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">No steps found in this pipeline run.</p>
			</EmptyState>
		);
	}

	return (
		<div className="h-full w-full overflow-auto bg-theme-surface-primary">
			<div className="sticky top-0 z-10 border-b border-theme-border-moderate bg-theme-surface-primary p-4 pb-2">
				<div className="mb-4">
					<h3 className="text-text-lg font-semibold text-theme-text-primary">Pipeline Timeline</h3>
					<p className="text-text-sm text-theme-text-secondary">
						Total Duration: {secondsToTimeString(timelineData.totalDuration / 1000)}
						{searchTerm && timelineData.filteredCount < timelineData.totalSteps && (
							<span className="ml-2">
								• Showing {timelineData.filteredCount} of {timelineData.totalSteps} steps
							</span>
						)}
					</p>
				</div>

				<SearchField
					searchParams={{}}
					inMemoryHandler={setSearchTerm}
					placeholder="Search steps..."
				/>
			</div>

			<div className="p-2">
				{searchTerm && timelineData.steps.length === 0 ? (
					<div
						className="py-16 flex flex-col items-center justify-center"
						role="status"
						aria-live="polite"
					>
						<EmptyState icon={<AlertCircle className="h-12 w-12 fill-neutral-300" />}>
							<p className="text-center text-theme-text-secondary">
								No steps found matching "{searchTerm}"
							</p>
							<p className="mt-2 text-center text-text-sm text-theme-text-tertiary">
								Try adjusting your search term or clear the search to see all steps
							</p>
						</EmptyState>
					</div>
				) : (
					<ol
						className="overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary"
						role="list"
						aria-label="Pipeline steps timeline"
					>
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
					</ol>
				)}
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
	// Safe calculation with proper null checks and edge case handling
	const safeStartTime = step.startTime ?? 0;
	const safeDuration = step.duration ?? 0;
	const safeTotalDuration = totalDuration > 0 ? totalDuration : 1; // Prevent division by zero

	const startPercentage = (safeStartTime / safeTotalDuration) * 100;
	const widthPercentage = (safeDuration / safeTotalDuration) * 100;

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

	function handleExpandKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (hasArtifacts) {
				onToggleExpand();
			}
		}
	}

	function handleStepKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (!step.isPreview) {
				openStepSheet(step.id);
			}
		}
	}

	return (
		<li
			className={`bg-theme-surface-primary ${!isLast ? "border-b border-theme-border-moderate" : ""} ${
				step.isPreview ? "opacity-50" : ""
			}`}
			role="listitem"
			aria-labelledby={`step-${step.id}-name`}
		>
			{/* Main Row */}
			<div className="flex w-full items-center gap-3 p-2">
				{/* Expand Button */}
				<button
					onClick={onToggleExpand}
					onKeyDown={handleExpandKeyDown}
					disabled={!hasArtifacts}
					aria-label={
						hasArtifacts
							? `${isExpanded ? "Collapse" : "Expand"} artifacts for ${step.name}`
							: "No artifacts available"
					}
					aria-expanded={hasArtifacts ? isExpanded : undefined}
					className={`focus:ring-theme-border-primary shrink-0 p-1 transition-colors focus:outline-none focus:ring-2 ${
						hasArtifacts
							? "text-theme-text-secondary hover:text-theme-text-primary"
							: "cursor-default text-transparent"
					}`}
				>
					{hasArtifacts &&
						(isExpanded ? (
							<ChevronDown className="h-4 w-4" aria-hidden="true" />
						) : (
							<ChevronRight className="h-4 w-4" aria-hidden="true" />
						))}
				</button>

				{/* Step Info */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								onClick={handleStepClick}
								onKeyDown={handleStepKeyDown}
								disabled={step.isPreview}
								aria-label={`View details for step ${step.name}`}
								className={`rounded -m-1 focus:ring-theme-border-primary flex min-w-0 flex-1 items-center gap-2 p-1 text-left transition-colors focus:outline-none focus:ring-2 ${
									step.isPreview
										? "cursor-default"
										: "hover:bg-theme-surface-secondary focus:bg-theme-surface-secondary"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2">
										<div
											className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(step.status)}`}
										>
											<ExecutionStatusIcon status={step.status} className="h-3 w-3 shrink-0" />
										</div>
										<p
											id={`step-${step.id}-name`}
											className="truncate font-semibold text-theme-text-primary"
										>
											{step.name}
										</p>
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
						</TooltipTrigger>
						<TooltipContent className="z-20 max-w-xs">
							<div className="space-y-1">
								<div className="font-medium">{step.name}</div>
								{!step.isPreview && (
									<>
										<div className="text-text-sm">
											{step.inputArtifacts.length} input
											{step.inputArtifacts.length !== 1 ? "s" : ""}, {step.outputArtifacts.length}{" "}
											output{step.outputArtifacts.length !== 1 ? "s" : ""}
										</div>
										{(step.actualStartTime || step.actualEndTime) && (
											<div className="text-text-xs text-theme-text-secondary">
												{step.actualStartTime && (
													<div>Started: {new Date(step.actualStartTime).toLocaleString()}</div>
												)}
												{step.actualEndTime && (
													<div>Ended: {new Date(step.actualEndTime).toLocaleString()}</div>
												)}
											</div>
										)}
									</>
								)}
								{step.isPreview && (
									<div className="text-text-sm text-theme-text-secondary">
										{step.status === "failed"
											? "Will not execute due to upstream error"
											: step.status === "stopped"
												? "Not executed - run was stopped"
												: "Pending execution"}
									</div>
								)}
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

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
				<div
					className="border-theme-border-subtle border-t bg-theme-surface-secondary px-8 py-3"
					role="region"
					aria-label={`Artifacts for ${step.name}`}
				>
					{/* Input Artifacts */}
					{step.inputArtifacts.length > 0 && (
						<div className="mb-3">
							<h4 className="mb-2 text-text-sm font-medium text-theme-text-secondary">
								Input Artifacts ({step.inputArtifacts.length})
							</h4>
							<div className="flex flex-wrap gap-2">
								{step.inputArtifacts.map((artifact) => (
									<TooltipProvider key={artifact.id}>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													onClick={(e) => handleArtifactClick(e, artifact.id)}
													className="rounded flex items-center gap-2 border border-theme-border-moderate bg-theme-surface-primary px-2 py-1 text-left transition-colors hover:bg-theme-surface-secondary"
												>
													<ArtifactIcon
														className="h-3 w-3 fill-theme-text-secondary"
														artifactType={artifact.type as any}
													/>
													<span className="text-text-sm text-theme-text-primary">
														{artifact.name}
													</span>
												</button>
											</TooltipTrigger>
											<TooltipContent className="z-20 max-w-xs">
												<div className="space-y-1">
													<div className="font-medium">{artifact.name}</div>
													<div className="text-text-sm">Type: {artifact.type}</div>
													{artifact.dataType && (
														<div className="text-text-sm">Data Type: {artifact.dataType}</div>
													)}
													{artifact.version && (
														<div className="text-text-sm">Version: {artifact.version}</div>
													)}
													{artifact.createdAt && (
														<div className="text-text-xs text-theme-text-secondary">
															Created: {new Date(artifact.createdAt).toLocaleString()}
														</div>
													)}
												</div>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
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
									<TooltipProvider key={artifact.id}>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													onClick={(e) => handleArtifactClick(e, artifact.id)}
													className="rounded flex items-center gap-2 border border-theme-border-moderate bg-theme-surface-primary px-2 py-1 text-left transition-colors hover:bg-theme-surface-secondary"
												>
													<ArtifactIcon
														className="h-3 w-3 fill-theme-text-secondary"
														artifactType={artifact.type as any}
													/>
													<span className="text-text-sm text-theme-text-primary">
														{artifact.name}
													</span>
												</button>
											</TooltipTrigger>
											<TooltipContent className="z-20 max-w-xs">
												<div className="space-y-1">
													<div className="font-medium">{artifact.name}</div>
													<div className="text-text-sm">Type: {artifact.type}</div>
													{artifact.dataType && (
														<div className="text-text-sm">Data Type: {artifact.dataType}</div>
													)}
													{artifact.version && (
														<div className="text-text-sm">Version: {artifact.version}</div>
													)}
													{artifact.createdAt && (
														<div className="text-text-xs text-theme-text-secondary">
															Created: {new Date(artifact.createdAt).toLocaleString()}
														</div>
													)}
												</div>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</li>
	);
}
