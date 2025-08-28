import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Play from "@/assets/icons/play-circle.svg?react";
import MessageCircle from "@/assets/icons/message-chat-square.svg?react";
import ExternalLink from "@/assets/icons/link-external.svg?react";
import Clock from "@/assets/icons/clock.svg?react";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import XCircle from "@/assets/icons/slash-circle.svg?react";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import Server from "@/assets/icons/database.svg?react";
import Terminal from "@/assets/icons/terminal.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";

import { PageHeader } from "@/components/PageHeader";
import { KeyValue } from "@/components/KeyValue";
import { DisplayDate } from "@/components/DisplayDate";
import { Button, Skeleton, Box } from "@zenml-io/react-component-library/components/server";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library/components/client";

import {
	pipelineEndpointQueries,
	useExecutePipelineEndpoint,
	useGetPipelineEndpointLogs,
	usePipelineEndpointJobs,
	usePipelineEndpointInfo
} from "@/data/pipeline-endpoints";
import { routes } from "@/router/routes";
import type {
	PipelineExecutionRequest,
	PipelineExecutionResponse,
	JobStatus
} from "@/types/pipeline-endpoints";

// JobsContent component to display async job results
function JobsContent({ endpointId }: { endpointId: string }) {
	const [selectedJob, setSelectedJob] = useState<JobStatus | null>(null);
	const {
		data: jobsData,
		isLoading: jobsLoading,
		error: jobsError
	} = usePipelineEndpointJobs(endpointId, { limit: 50 });

	const getJobStatusBadge = (status: string) => {
		const configs: Record<string, any> = {
			running: {
				className: "bg-blue-50 text-blue-700 border-blue-200",
				dot: "bg-blue-500",
				icon: <Clock className="h-4 w-4 fill-blue-500" />
			},
			completed: {
				className: "bg-green-50 text-green-700 border-green-200",
				dot: "bg-green-500",
				icon: <CheckCircle className="h-4 w-4 fill-green-500" />
			},
			failed: {
				className: "bg-red-50 text-red-700 border-red-200",
				dot: "bg-red-500",
				icon: <XCircle className="h-4 w-4 fill-red-500" />
			},
			pending: {
				className: "bg-yellow-50 text-yellow-700 border-yellow-200",
				dot: "bg-yellow-500",
				icon: <Clock className="h-4 w-4 fill-yellow-500" />
			},
			canceled: {
				className: "bg-gray-50 text-gray-700 border-gray-200",
				dot: "bg-gray-500",
				icon: <XCircle className="h-4 w-4 fill-gray-500" />
			}
		};

		const config = configs[status] || configs.pending;
		return (
			<div
				className={`py-1.5 rounded-full text-sm inline-flex items-center gap-2 border px-3 font-medium ${config.className}`}
			>
				<span className={`rounded-full h-2 w-2 ${config.dot}`} />
				{config.icon}
				<span className="capitalize">{status}</span>
			</div>
		);
	};

	if (jobsLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="w-48 h-8" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (jobsError) {
		const isEndpointDown =
			jobsError.message?.includes("Pipeline endpoint URL not available") ||
			jobsError.message?.includes("Failed to fetch");

		return (
			<Box className="rounded-xl border border-red-200 bg-red-50 p-6">
				<div className="flex items-start gap-3">
					<XCircle className="mt-0.5 h-5 w-5 fill-red-500" />
					<div>
						<p className="font-semibold text-red-900">
							{isEndpointDown ? "Pipeline endpoint not available" : "Failed to load jobs"}
						</p>
						<p className="text-sm mt-1 text-red-700">
							{isEndpointDown
								? "The pipeline endpoint is not running or not accessible. Please ensure the endpoint is deployed and running."
								: "There was an error loading the job history for this pipeline endpoint."}
						</p>
						{jobsError.message && (
							<p className="text-xs mt-2 font-mono text-red-600">{jobsError.message}</p>
						)}
					</div>
				</div>
			</Box>
		);
	}

	const jobs = jobsData?.jobs || [];

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{/* Jobs List */}
			<Box className="rounded-xl overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0">
				<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
					<h3 className="flex items-center gap-2 text-text-lg font-semibold text-theme-text-primary">
						<Play className="h-5 w-5 fill-theme-text-brand" />
						Job History ({jobs.length})
					</h3>
					<p className="text-sm mt-1 text-theme-text-secondary">Async pipeline execution results</p>
				</div>
				<div className="max-h-96 overflow-y-auto">
					{jobs.length === 0 ? (
						<div className="p-6 text-center">
							<Play className="mx-auto mb-4 h-12 w-12 fill-gray-400" />
							<p className="text-sm text-gray-600">No async jobs found</p>
							<p className="text-xs mt-1 text-gray-500">
								Jobs will appear here when you execute pipelines asynchronously
							</p>
						</div>
					) : (
						<div className="divide-y divide-theme-border-moderate">
							{jobs.map((job) => (
								<div
									key={job.job_id}
									className={`cursor-pointer p-4 transition-colors hover:bg-theme-surface-secondary ${
										selectedJob?.job_id === job.job_id ? "bg-theme-surface-secondary" : ""
									}`}
									onClick={() => setSelectedJob(job)}
								>
									<div className="mb-2 flex items-center justify-between">
										<span className="text-sm max-w-[200px] truncate font-mono text-theme-text-primary">
											{job.job_id}
										</span>
										{getJobStatusBadge(job.status)}
									</div>
									<div className="text-xs text-theme-text-secondary">
										<div>
											Created: <DisplayDate dateString={job.created_at} />
										</div>
										{job.completed_at && (
											<div>
												Completed: <DisplayDate dateString={job.completed_at} />
											</div>
										)}
										{job.execution_time && <div>Duration: {job.execution_time.toFixed(2)}s</div>}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</Box>

			{/* Job Details */}
			<Box className="rounded-xl overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0">
				<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
					<h3 className="flex items-center gap-2 text-text-lg font-semibold text-theme-text-primary">
						<Terminal className="h-5 w-5 fill-theme-text-brand" />
						Job Details
					</h3>
				</div>
				<div className="p-6">
					{!selectedJob ? (
						<div className="py-12 text-center">
							<Terminal className="mx-auto mb-4 h-12 w-12 fill-gray-400" />
							<p className="text-sm text-gray-600">Select a job to view details</p>
						</div>
					) : (
						<div className="space-y-4">
							<div className="space-y-3">
								<KeyValue
									label="Job ID"
									value={<span className="text-sm font-mono">{selectedJob.job_id}</span>}
								/>
								<KeyValue label="Status" value={getJobStatusBadge(selectedJob.status)} />
								{selectedJob.run_name && <KeyValue label="Run Name" value={selectedJob.run_name} />}
								{selectedJob.pipeline_name && (
									<KeyValue label="Pipeline" value={selectedJob.pipeline_name} />
								)}
								<KeyValue
									label="Created"
									value={<DisplayDate dateString={selectedJob.created_at} />}
								/>
								{selectedJob.started_at && (
									<KeyValue
										label="Started"
										value={<DisplayDate dateString={selectedJob.started_at} />}
									/>
								)}
								{selectedJob.completed_at && (
									<KeyValue
										label="Completed"
										value={<DisplayDate dateString={selectedJob.completed_at} />}
									/>
								)}
								{selectedJob.execution_time && (
									<KeyValue
										label="Execution Time"
										value={`${selectedJob.execution_time.toFixed(2)}s`}
									/>
								)}
								<KeyValue label="Steps Executed" value={selectedJob.steps_executed.toString()} />
							</div>

							{selectedJob.error && (
								<div className="rounded-lg mt-4 border border-red-200 bg-red-50 p-4">
									<h4 className="text-sm mb-2 font-semibold text-red-900">Error</h4>
									<p className="text-sm whitespace-pre-wrap font-mono text-red-800">
										{selectedJob.error}
									</p>
								</div>
							)}

							{selectedJob.result && (
								<div className="mt-4">
									<h4 className="text-sm mb-2 font-semibold text-theme-text-primary">Result</h4>
									<div className="rounded-lg bg-theme-surface-secondary p-4">
										<pre className="text-sm max-h-64 overflow-auto whitespace-pre-wrap font-mono">
											{typeof selectedJob.result === "string"
												? selectedJob.result
												: JSON.stringify(selectedJob.result, null, 2)}
										</pre>
									</div>
								</div>
							)}

							{selectedJob.parameters && Object.keys(selectedJob.parameters).length > 0 && (
								<div className="mt-4">
									<h4 className="text-sm mb-2 font-semibold text-theme-text-primary">Parameters</h4>
									<div className="rounded-lg bg-theme-surface-secondary p-4">
										<pre className="text-sm overflow-auto font-mono">
											{JSON.stringify(selectedJob.parameters, null, 2)}
										</pre>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</Box>
		</div>
	);
}

export default function PipelineEndpointDetailPage() {
	const { endpointId } = useParams<{ endpointId: string }>();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("overview");
	const [executionRequest, setExecutionRequest] = useState<PipelineExecutionRequest>({
		parameters: {},
		enable_cache: true
	});
	const [parametersJson, setParametersJson] = useState("{}");
	const [executionResult, setExecutionResult] = useState<PipelineExecutionResponse | null>(null);
	const [logs, setLogs] = useState<string[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [followLogs, setFollowLogs] = useState(false);
	const [logsError, setLogsError] = useState<string | null>(null);

	const {
		data: endpoint,
		isLoading,
		error
	} = useQuery(pipelineEndpointQueries.pipelineEndpointDetail(endpointId!));

	// Get pipeline info for parameter schema
	const { data: pipelineInfo, isLoading: pipelineInfoLoading } = usePipelineEndpointInfo(
		endpointId!
	);

	// Generate parameter placeholder based on pipeline info
	const generateParameterPlaceholder = useCallback((): string => {
		if (!pipelineInfo?.pipeline.parameters) {
			return `{
  "param1": "value1",
  "param2": 42,
  "param3": true
}`;
		}

		const exampleParams: Record<string, any> = {};

		Object.entries(pipelineInfo.pipeline.parameters).forEach(([name, schema]) => {
			if (schema.default !== undefined) {
				exampleParams[name] = schema.default;
			} else {
				// Generate example values based on type
				switch (schema.type) {
					case "str":
					case "string":
						exampleParams[name] = name === "city" ? "London" : `example_${name}`;
						break;
					case "int":
					case "integer":
						exampleParams[name] = 42;
						break;
					case "float":
						exampleParams[name] = 3.14;
						break;
					case "bool":
					case "boolean":
						exampleParams[name] = true;
						break;
					case "list":
						exampleParams[name] = [`item1`, `item2`];
						break;
					case "dict":
						exampleParams[name] = { key: "value" };
						break;
					default:
						exampleParams[name] = `example_${name}`;
				}
			}
		});

		return JSON.stringify(exampleParams, null, 2);
	}, [pipelineInfo]);

	// Initialize parameters when pipeline info loads
	useEffect(() => {
		if (pipelineInfo && parametersJson === "{}") {
			const defaultParams = generateParameterPlaceholder();
			setParametersJson(defaultParams);
			try {
				const parsed = JSON.parse(defaultParams);
				setExecutionRequest((prev) => ({ ...prev, parameters: parsed }));
			} catch (e) {
				// Fallback to empty object
			}
		}
	}, [pipelineInfo, generateParameterPlaceholder]);

	const executeMutation = useExecutePipelineEndpoint();
	const logsMutation = useGetPipelineEndpointLogs();

	const handleParametersChange = (value: string) => {
		setParametersJson(value);
		try {
			const parsed = JSON.parse(value);
			setExecutionRequest((prev) => ({ ...prev, parameters: parsed }));
		} catch (e) {
			// Invalid JSON, keep previous state
		}
	};

	const handleExecute = async (mode: "sync" | "async") => {
		if (!endpointId) return;

		try {
			const result = await executeMutation.mutateAsync({
				endpointId,
				executionRequest,
				mode
			});
			setExecutionResult(result);
		} catch (error) {
			console.error("Execution failed:", error);
		}
	};

	const handleGetLogs = (follow: boolean = false, tail?: number) => {
		if (!endpointId) return;

		setIsStreaming(true);
		setLogs([]);
		setLogsError(null);

		logsMutation.mutate(
			{
				endpointId,
				follow,
				tail,
				onLog: (log: string) => {
					setLogs((prev) => [...prev, log]);
				},
				onError: (error: string) => {
					setLogsError(error);
					setLogs((prev) => [...prev, `ERROR: ${error}`]);
				}
			},
			{
				onError: (error: any) => {
					console.error("Logs mutation error:", error);
					setLogsError(error.message || "Failed to retrieve logs");
				},
				onSettled: () => {
					setIsStreaming(false);
				}
			}
		);
	};

	const getStatusBadge = (status: string) => {
		const configs: Record<string, any> = {
			running: {
				className:
					"bg-theme-success-subtle text-theme-success-strong border-theme-success-moderate",
				dot: "bg-theme-success-strong",
				icon: <CheckCircle className="fill-theme-success-strong h-4 w-4" />
			},
			pending: {
				className:
					"bg-theme-warning-subtle text-theme-warning-strong border-theme-warning-moderate",
				dot: "bg-theme-warning-strong",
				icon: <Clock className="fill-theme-warning-strong h-4 w-4" />
			},
			stopped: {
				className:
					"bg-theme-surface-secondary text-theme-text-secondary border-theme-border-moderate",
				dot: "bg-theme-text-tertiary",
				icon: <XCircle className="h-4 w-4 fill-theme-text-tertiary" />
			},
			error: {
				className: "bg-theme-error-subtle text-theme-error-strong border-theme-error-moderate",
				dot: "bg-theme-error-strong",
				icon: <XCircle className="fill-theme-error-strong h-4 w-4" />
			}
		};

		const config = configs[status] || configs.stopped;
		return (
			<div
				className={`py-1.5 rounded-full text-sm inline-flex items-center gap-2 border px-3 font-medium ${config.className}`}
			>
				<span className={`rounded-full h-2 w-2 ${config.dot}`} />
				{config.icon}
				<span className="capitalize">{status}</span>
			</div>
		);
	};

	if (isLoading) {
		return (
			<div className="layout-container space-y-5 py-5">
				<Skeleton className="w-48 h-8" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (error || !endpoint) {
		return (
			<div className="layout-container space-y-5 py-5">
				<PageHeader>
					<Button
						onClick={() => navigate(routes.projects.pipelineEndpoints.overview)}
						className="text-gray-600 hover:text-gray-900"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Pipeline Endpoints
					</Button>
				</PageHeader>
				<div className="rounded-lg border border-red-200 bg-red-50 p-4">
					<p className="text-red-800">Failed to load pipeline endpoint details</p>
				</div>
			</div>
		);
	}

	return (
		<div className="layout-container space-y-5 py-5">
			{/* Breadcrumb Navigation */}
			<nav className="text-sm flex items-center gap-2">
				<Link
					to="/projects"
					className="text-theme-text-tertiary transition-colors hover:text-theme-text-primary"
				>
					Projects
				</Link>
				<ChevronRight className="h-4 w-4 fill-theme-text-tertiary" />
				<Link
					to={routes.projects.pipelineEndpoints.overview}
					className="text-theme-text-tertiary transition-colors hover:text-theme-text-primary"
				>
					Pipeline Endpoints
				</Link>
				<ChevronRight className="h-4 w-4 fill-theme-text-tertiary" />
				<span className="font-medium text-theme-text-primary">{endpoint.name}</span>
			</nav>

			<PageHeader className="border-b border-theme-border-moderate pb-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-theme-surface-secondary p-2">
							<Server className="h-6 w-6 fill-theme-text-brand" />
						</div>
						<div>
							<h1 className="text-display-xs font-semibold text-theme-text-primary">
								{endpoint.name}
							</h1>
							<div className="mt-1 flex items-center gap-3">
								{getStatusBadge(endpoint.body.status)}
								{endpoint.body.url && (
									<span className="text-sm text-theme-text-secondary">
										Endpoint:{" "}
										<span className="font-mono text-theme-text-brand">{endpoint.body.url}</span>
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						{endpoint.body.url && (
							<Button
								onClick={() => window.open(endpoint.body.url!, "_blank")}
								intent="secondary"
								size="md"
								className="gap-2 rounded-md"
							>
								<ExternalLink className="h-4 w-4" />
								Open Endpoint
							</Button>
						)}
						{endpoint.body.status === "running" && (
							<Button
								onClick={() => navigate(routes.projects.pipelineEndpoints.chat(endpoint.id))}
								intent="primary"
								size="md"
								className="gap-2 rounded-md"
							>
								<MessageCircle className="h-4 w-4 fill-white" />
								Open Chat Interface
							</Button>
						)}
					</div>
				</div>
			</PageHeader>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
				<TabsList className="rounded-xl border border-neutral-200 bg-neutral-100 p-1">
					<TabsTrigger
						value="overview"
						className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
					>
						Overview
					</TabsTrigger>
					<TabsTrigger
						value="execute"
						className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
					>
						Execute
					</TabsTrigger>
					<TabsTrigger
						value="jobs"
						className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
					>
						Jobs
					</TabsTrigger>
					<TabsTrigger
						value="logs"
						className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
					>
						Logs
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Box className="rounded-lg overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0">
							<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
								<h3 className="flex items-center gap-2 text-text-lg font-semibold text-theme-text-primary">
									<Server className="h-5 w-5 fill-theme-text-brand" />
									Endpoint Information
								</h3>
							</div>
							<div className="space-y-3 px-6 py-4">
								<KeyValue label="Status" value={getStatusBadge(endpoint.body.status)} />
								<KeyValue label="URL" value={endpoint.body.url || "Not available"} />
								{endpoint.metadata?.endpoint_metadata?.port && (
									<KeyValue
										label="Port"
										value={endpoint.metadata.endpoint_metadata.port.toString()}
									/>
								)}
								<KeyValue
									label="Created"
									value={<DisplayDate dateString={endpoint.body.created} />}
								/>
								<KeyValue
									label="Updated"
									value={<DisplayDate dateString={endpoint.body.updated} />}
								/>
							</div>
						</Box>

						<Box className="rounded-lg overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0">
							<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
								<h3 className="flex items-center gap-2 text-text-lg font-semibold text-theme-text-primary">
									<Play className="h-5 w-5 fill-theme-text-brand" />
									Pipeline Information
								</h3>
							</div>
							<div className="space-y-3 px-6 py-4">
								<KeyValue
									label="Deployment ID"
									value={endpoint.resources.pipeline_deployment?.id || "Unknown"}
								/>
								<KeyValue
									label="Pipeline Server"
									value={endpoint.resources.pipeline_server?.name || "Unknown"}
								/>
								<KeyValue
									label="Server Type"
									value={endpoint.resources.pipeline_server?.body?.flavor_name || "Unknown"}
								/>
							</div>
						</Box>
					</div>

					{endpoint.metadata?.endpoint_metadata && (
						<Box className="rounded-lg overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0">
							<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
								<h3 className="text-text-lg font-semibold text-theme-text-primary">
									Container Information
								</h3>
							</div>
							<div className="space-y-3 px-6 py-4">
								{endpoint.metadata.endpoint_metadata.container_name && (
									<KeyValue
										label="Container Name"
										value={endpoint.metadata.endpoint_metadata.container_name}
									/>
								)}
								{endpoint.metadata.endpoint_metadata.container_status && (
									<KeyValue
										label="Container Status"
										value={endpoint.metadata.endpoint_metadata.container_status}
									/>
								)}
								{endpoint.metadata.endpoint_metadata.container_image_uri && (
									<KeyValue
										label="Image URI"
										value={endpoint.metadata.endpoint_metadata.container_image_uri}
									/>
								)}
								{endpoint.metadata.endpoint_metadata.container_id && (
									<KeyValue
										label="Container ID"
										value={
											<span className="text-xs break-all font-mono">
												{endpoint.metadata.endpoint_metadata.container_id.substring(0, 12)}...
											</span>
										}
									/>
								)}
							</div>
						</Box>
					)}

					{endpoint.metadata && Object.keys(endpoint.metadata).length > 0 && (
						<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
							<div className="border-b border-gray-200 px-6 py-4">
								<h3 className="text-lg font-medium text-gray-900">Full Metadata</h3>
							</div>
							<div className="px-6 py-4">
								<pre className="text-sm overflow-auto rounded-md bg-theme-surface-tertiary p-4">
									{JSON.stringify(endpoint.metadata, null, 2)}
								</pre>
							</div>
						</div>
					)}
				</TabsContent>

				<TabsContent value="execute" className="space-y-5">
					{endpoint.body.status !== "running" ? (
						<Box className="rounded-xl border border-amber-200 bg-amber-50 p-6">
							<div className="flex items-start gap-3">
								<div className="rounded-lg bg-amber-100 p-2">
									<Clock className="h-5 w-5 fill-amber-600" />
								</div>
								<div>
									<p className="font-semibold text-amber-900">Pipeline endpoint not active</p>
									<p className="text-sm mt-1 text-amber-700">
										The endpoint must be in running state to execute. Current status:{" "}
										<span className="font-bold uppercase">{endpoint.body.status}</span>
									</p>
								</div>
							</div>
						</Box>
					) : (
						<>
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								{/* Left Column - Parameter Editor */}
								<Box className="rounded-xl overflow-hidden border border-neutral-200 bg-white p-0 shadow-sm">
									<div className="border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4">
										<h3 className="text-lg flex items-center gap-2 font-semibold text-neutral-900">
											<div className="p-1.5 rounded-lg bg-white shadow-sm">
												<Terminal className="h-4 w-4 fill-primary-600" />
											</div>
											Pipeline Parameters
										</h3>
									</div>
									<div className="space-y-4 px-6 py-5">
										{/* Pipeline Parameter Info */}
										{pipelineInfo?.pipeline.parameters &&
											Object.keys(pipelineInfo.pipeline.parameters).length > 0 && (
												<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
													<h4 className="text-sm mb-2 flex items-center gap-2 font-semibold text-blue-900">
														<div className="rounded-full flex h-4 w-4 items-center justify-center bg-blue-500">
															<span className="text-xs font-bold text-white">i</span>
														</div>
														Pipeline Parameters ({pipelineInfo.pipeline.name})
													</h4>
													<div className="space-y-1">
														{Object.entries(pipelineInfo.pipeline.parameters).map(
															([name, schema]) => (
																<div
																	key={name}
																	className="text-xs flex items-center gap-2 text-blue-800"
																>
																	<code className="px-1.5 rounded bg-blue-100 py-0.5 font-mono font-semibold">
																		{name}
																	</code>
																	<span className="text-blue-600">({schema.type})</span>
																	{schema.default !== undefined && (
																		<span className="text-blue-600">
																			default:{" "}
																			<code className="font-mono">
																				{JSON.stringify(schema.default)}
																			</code>
																		</span>
																	)}
																	{schema.required && (
																		<span className="font-semibold text-red-600">required</span>
																	)}
																</div>
															)
														)}
													</div>
												</div>
											)}

										<div>
											<div className="mb-2 flex items-center justify-between">
												<label className="text-sm flex items-center gap-2 font-semibold text-neutral-700">
													<span>Parameters</span>
													<span className="text-xs font-normal text-neutral-500">
														(JSON format)
													</span>
												</label>
												{pipelineInfo && (
													<Button
														onClick={() => {
															const defaultParams = generateParameterPlaceholder();
															setParametersJson(defaultParams);
															try {
																const parsed = JSON.parse(defaultParams);
																setExecutionRequest((prev) => ({ ...prev, parameters: parsed }));
															} catch (e) {
																// Fallback to empty object
															}
														}}
														intent="secondary"
														size="sm"
														className="text-xs gap-1 rounded-md"
													>
														<Refresh className="h-3 w-3" />
														Load Template
													</Button>
												)}
											</div>
											<div className="relative">
												<textarea
													value={parametersJson}
													onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
														handleParametersChange(e.target.value)
													}
													placeholder={
														pipelineInfoLoading
															? "Loading pipeline schema..."
															: generateParameterPlaceholder()
													}
													className="text-sm rounded-lg w-full border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
													rows={10}
												/>
											</div>
										</div>

										<div>
											<label className="text-sm mb-2 block font-semibold text-neutral-700">
												Run Name{" "}
												<span className="text-xs font-normal text-neutral-500">(optional)</span>
											</label>
											<input
												type="text"
												value={executionRequest.run_name || ""}
												onChange={(e) =>
													setExecutionRequest((prev) => ({
														...prev,
														run_name: e.target.value || undefined
													}))
												}
												className="rounded-lg w-full border border-neutral-200 bg-neutral-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
												placeholder="my-custom-run-2024"
											/>
										</div>

										<div className="flex items-center gap-3">
											<input
												id="enable-cache"
												type="checkbox"
												checked={executionRequest.enable_cache}
												onChange={(e) =>
													setExecutionRequest((prev) => ({
														...prev,
														enable_cache: e.target.checked
													}))
												}
												className="rounded h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-500"
											/>
											<label
												htmlFor="enable-cache"
												className="text-sm cursor-pointer select-none text-neutral-700"
											>
												Enable cache for this execution
											</label>
										</div>
									</div>

									<div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4">
										<div className="flex gap-3">
											<Button
												onClick={() => handleExecute("sync")}
												disabled={executeMutation.isPending}
												intent="primary"
												size="md"
												className="gap-2 rounded-md"
											>
												{executeMutation.isPending ? (
													<>
														<div className="rounded-full h-4 w-4 animate-spin border-2 border-white/30 border-t-white" />
														Executing...
													</>
												) : (
													<>
														<Play className="h-4 w-4 fill-white" />
														Execute Sync
													</>
												)}
											</Button>
											<Button
												onClick={() => handleExecute("async")}
												disabled={executeMutation.isPending}
												intent="primary"
												emphasis="subtle"
												size="md"
												className="gap-2 rounded-md"
											>
												<Play className="h-4 w-4 fill-primary-600" />
												Execute Async
											</Button>
										</div>
										<p className="text-xs mt-3 text-neutral-500">
											<strong>Sync:</strong> Wait for execution to complete •{" "}
											<strong>Async:</strong> Start execution and return immediately
										</p>
									</div>
								</Box>

								{/* Right Column - Quick Actions */}
								<div className="space-y-6">
									<Box className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
										<h4 className="mb-4 flex items-center gap-2 font-semibold text-neutral-900">
											<div className="rounded-full h-5 w-1 bg-primary-500" />
											Quick Actions
										</h4>
										<div className="space-y-2">
											<button className="rounded-lg text-sm w-full bg-neutral-50 px-4 py-3 text-left font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
												📄 Load from template
											</button>
											<button className="rounded-lg text-sm w-full bg-neutral-50 px-4 py-3 text-left font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
												📝 Save as template
											</button>
											<button className="rounded-lg text-sm w-full bg-neutral-50 px-4 py-3 text-left font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
												🔄 Reset parameters
											</button>
										</div>
									</Box>

									<Box className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
										<h4 className="mb-4 font-semibold text-neutral-900">Pipeline Info</h4>
										<div className="text-sm space-y-3">
											<div className="flex justify-between">
												<span className="text-neutral-600">Endpoint URL</span>
												<span className="text-xs font-mono text-primary-600">
													{endpoint.body.url}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-neutral-600">Server</span>
												<span className="text-neutral-900">
													{endpoint.resources.pipeline_server?.name}
												</span>
											</div>
										</div>
									</Box>
								</div>
							</div>

							{executionResult && (
								<Box className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
									<div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100 px-6 py-4">
										<h3 className="text-lg flex items-center gap-3 font-semibold text-neutral-900">
											Execution Result
											{executionResult.success ? (
												<span className="gap-1.5 text-sm rounded-full flex items-center bg-green-100 px-3 py-1 font-medium text-green-700">
													<CheckCircle className="h-4 w-4 fill-green-600" />
													Success
												</span>
											) : (
												<span className="gap-1.5 text-sm rounded-full flex items-center bg-red-100 px-3 py-1 font-medium text-red-700">
													<XCircle className="h-4 w-4 fill-red-600" />
													Failed
												</span>
											)}
										</h3>
									</div>
									<div className="px-6 py-4">
										<div className="relative">
											<pre className="text-sm rounded-lg overflow-auto bg-neutral-900 p-4 font-mono text-neutral-100">
												{JSON.stringify(executionResult, null, 2)}
											</pre>
											<button className="text-xs rounded absolute right-2 top-2 bg-neutral-700 px-3 py-1 text-white transition-colors hover:bg-neutral-600">
												Copy
											</button>
										</div>
									</div>
								</Box>
							)}
						</>
					)}
				</TabsContent>

				<TabsContent value="jobs" className="space-y-4">
					<JobsContent endpointId={endpointId!} />
				</TabsContent>

				<TabsContent value="logs" className="space-y-4">
					<Box className="rounded-xl overflow-hidden border border-theme-border-moderate bg-theme-surface-primary shadow-lg">
						<div className="border-b border-theme-border-moderate bg-theme-surface-secondary px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-theme-surface-primary p-2">
										<Terminal className="h-5 w-5 fill-theme-text-brand" />
									</div>
									<div>
										<h3 className="text-text-lg font-semibold text-theme-text-primary">
											Pipeline Logs
										</h3>
										<p className="text-sm text-theme-text-secondary">
											{logs.length > 0 ? `${logs.length} log entries` : "No logs available"}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										onClick={() => handleGetLogs(false, 100)}
										disabled={isStreaming || endpoint?.body.status !== "running"}
										intent="secondary"
										size="sm"
										className="gap-2 rounded-md"
									>
										<Refresh className="h-4 w-4" />
										{isStreaming ? "Loading..." : "Refresh"}
									</Button>
									<Button
										onClick={() => {
											setFollowLogs(!followLogs);
											if (!followLogs) {
												handleGetLogs(true);
											}
										}}
										disabled={endpoint?.body.status !== "running"}
										intent={followLogs ? "primary" : "secondary"}
										size="sm"
										className="gap-2 rounded-md"
									>
										<Terminal className="h-4 w-4" />
										{followLogs ? "Stop Following" : "Follow Logs"}
									</Button>
								</div>
							</div>
						</div>

						<div className="h-96 text-sm bg-black font-mono text-green-400">
							<div className="scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 h-full overflow-y-auto">
								<div className="space-y-1 p-4">
									{logs.length === 0 && !isStreaming && (
										<div className="flex h-full flex-col items-center justify-center py-12 text-center">
											<Terminal className="mb-4 h-12 w-12 fill-gray-500" />
											<p className="text-base mb-2 text-gray-400">No logs available</p>
											{logsError ? (
												<div className="text-sm rounded mb-4 border border-red-700 bg-red-900/20 p-3 text-red-400">
													<p className="mb-1 font-medium">Error retrieving logs:</p>
													<p>{logsError}</p>
												</div>
											) : (
												<p className="text-sm mb-4 text-gray-500">
													{endpoint?.body.status === "running"
														? "Click 'Refresh' to load recent logs or 'Follow Logs' for real-time streaming"
														: "Pipeline endpoint must be running to view logs"}
												</p>
											)}
											{endpoint?.body.status === "running" && (
												<Button
													onClick={() => handleGetLogs(false, 100)}
													intent="primary"
													size="sm"
													className="gap-2 rounded-md"
												>
													<Refresh className="h-4 w-4" />
													Load Recent Logs
												</Button>
											)}
										</div>
									)}

									{isStreaming && logs.length === 0 && (
										<div className="flex items-center gap-2 text-yellow-400">
											<div className="rounded-full h-4 w-4 animate-spin border-2 border-yellow-400 border-t-transparent" />
											<span>Loading logs...</span>
										</div>
									)}

									{logs.map((log, index) => (
										<div key={index} className="whitespace-pre-wrap break-all">
											{log}
										</div>
									))}

									{isStreaming && logs.length > 0 && (
										<div className="flex items-center gap-2 pt-2 text-yellow-400">
											<div className="rounded-full h-2 w-2 animate-pulse bg-yellow-400" />
											<span>Streaming logs...</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</Box>
				</TabsContent>
			</Tabs>
		</div>
	);
}
