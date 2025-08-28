import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Plus from "@/assets/icons/plus.svg?react";
import Play from "@/assets/icons/play-circle.svg?react";
import MessageCircle from "@/assets/icons/message-chat-square.svg?react";
import ExternalLink from "@/assets/icons/link-external.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import Server from "@/assets/icons/database.svg?react";
import Clock from "@/assets/icons/clock.svg?react";
import Terminal from "@/assets/icons/terminal.svg?react";

import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import Pagination from "@/components/Pagination";
import { DisplayDate } from "@/components/DisplayDate";
import { Skeleton, Button, Box } from "@zenml-io/react-component-library/components/server";

import { pipelineEndpointQueries } from "@/data/pipeline-endpoints";
import { routes } from "@/router/routes";
import type { PipelineEndpoint, PipelineEndpointListParams } from "@/types/pipeline-endpoints";

export default function PipelineEndpointsPage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// Parse search params
	const queryParams: PipelineEndpointListParams = {
		page: parseInt(searchParams.get("page") || "1"),
		size: parseInt(searchParams.get("size") || "20"),
		name: searchParams.get("name") || undefined,
		status: (searchParams.get("status") as any) || undefined,
		sort_by: searchParams.get("sort_by") || "created"
	};

	const { data, isLoading, error, refetch } = useQuery(
		pipelineEndpointQueries.pipelineEndpointList(queryParams)
	);

	const handleStatusFilter = (status: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (status === "all") {
			newParams.delete("status");
		} else {
			newParams.set("status", status);
		}
		newParams.set("page", "1");
		setSearchParams(newParams);
	};

	const getStatusBadge = (status: PipelineEndpoint["body"]["status"]) => {
		const statusConfig = {
			running: {
				className: "bg-green-50 text-green-700 border-green-200",
				dot: "bg-green-500 animate-pulse",
				icon: "🟢"
			},
			pending: {
				className: "bg-yellow-50 text-yellow-700 border-yellow-200",
				dot: "bg-yellow-500 animate-pulse",
				icon: "🟡"
			},
			stopped: {
				className: "bg-neutral-100 text-neutral-600 border-neutral-200",
				dot: "bg-neutral-400",
				icon: "⚫"
			},
			error: {
				className: "bg-red-50 text-red-700 border-red-200",
				dot: "bg-red-500",
				icon: "🔴"
			}
		};
		const config = statusConfig[status] || statusConfig.stopped;
		return (
			<div
				className={`gap-1.5 py-1.5 rounded-full text-xs inline-flex items-center border px-3 font-semibold ${config.className} shadow-sm`}
			>
				<span className={`rounded-full h-2 w-2 ${config.dot}`} />
				<span className="uppercase tracking-wide">{status}</span>
			</div>
		);
	};

	if (error) {
		return (
			<div className="layout-container space-y-5 py-5">
				<PageHeader>
					<h1 className="text-text-xl font-semibold">Pipeline Endpoints</h1>
				</PageHeader>
				<div className="py-8 text-center">
					<p className="text-theme-text-negative">Failed to load pipeline endpoints</p>
				</div>
			</div>
		);
	}

	return (
		<div className="layout-container space-y-6 py-5">
			<PageHeader className="border-b border-theme-border-moderate pb-5">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-display-xs font-semibold text-theme-text-primary">
							Pipeline Endpoints
						</h1>
						<p className="mt-1 text-text-md text-theme-text-secondary">
							Deploy and manage your ML pipelines as scalable HTTP endpoints
						</p>
					</div>
					<Button size="md" intent="primary" className="gap-2">
						<Plus className="h-4 w-4 fill-white" />
						Deploy Pipeline
					</Button>
				</div>
			</PageHeader>

			{/* Filters */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<SearchField searchParams={queryParams} placeholder="Search pipeline endpoints..." />
					<div className="rounded-lg flex gap-1 border border-neutral-200 bg-neutral-100 p-1">
						{["all", "running", "pending", "stopped", "error"].map((status) => {
							const isActive =
								queryParams.status === status || (status === "all" && !queryParams.status);
							const statusColors = {
								all: "bg-white text-neutral-900",
								running: "bg-green-500 text-white",
								pending: "bg-yellow-500 text-white",
								stopped: "bg-neutral-500 text-white",
								error: "bg-red-500 text-white"
							};
							return (
								<button
									key={status}
									className={`text-sm rounded-md px-4 py-2 font-medium transition-all duration-200 ${
										isActive
											? status === "all"
												? "border border-neutral-200 bg-white text-neutral-900 shadow-sm"
												: `${statusColors[status]} shadow-sm`
											: "text-neutral-600 hover:bg-white/50 hover:text-neutral-900"
									}`}
									onClick={() => handleStatusFilter(status)}
								>
									{status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
								</button>
							);
						})}
					</div>
				</div>
				<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
					<Refresh className="h-5 w-5 fill-theme-text-brand" />
					Refresh
				</Button>
			</div>

			{/* Pipeline Endpoints List */}
			{isLoading ? (
				<div className="space-y-3">
					{Array.from({ length: 5 }, (_, i) => (
						<Skeleton key={i} className="h-24 w-full" />
					))}
				</div>
			) : !data?.items.length ? (
				<Box className="py-16 rounded-lg border-2 border-dashed border-theme-border-moderate bg-theme-surface-secondary/30 px-8 text-center">
					<Server className="mx-auto mb-4 h-12 w-12 fill-theme-text-tertiary" />
					<h3 className="mb-2 text-text-xl font-semibold text-theme-text-primary">
						No pipeline endpoints
					</h3>
					<p className="mx-auto mb-6 max-w-md text-text-md text-theme-text-secondary">
						Pipeline endpoints allow you to serve your ML pipelines as production-ready HTTP APIs
					</p>
					<Button size="md" intent="primary" className="gap-2">
						<Plus className="h-4 w-4 fill-white" />
						Deploy Your First Pipeline
					</Button>
				</Box>
			) : (
				<div className="grid gap-4">
					{data.items.map((endpoint) => (
						<Box
							key={endpoint.id}
							className="rounded-xl group relative cursor-pointer overflow-hidden border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-xl"
							onClick={() => navigate(routes.projects.pipelineEndpoints.detail(endpoint.id))}
						>
							{/* Gradient background on hover */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							<div className="relative flex items-start justify-between gap-6">
								<div className="min-w-0 flex-1">
									{/* Header */}
									<div className="mb-4 flex items-start gap-4">
										<div className="rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 p-3">
											<Terminal className="h-6 w-6 fill-primary-600" />
										</div>
										<div className="flex-1">
											<h3 className="text-lg mb-2 font-semibold text-neutral-900">
												{endpoint.name}
											</h3>
											<div className="flex items-center gap-3">
												{getStatusBadge(endpoint.body.status)}
												{endpoint.body.url && (
													<a
														href={endpoint.body.url}
														target="_blank"
														rel="noopener noreferrer"
														onClick={(e) => e.stopPropagation()}
														className="text-xs flex items-center gap-1 font-medium text-primary-600 hover:text-primary-700"
													>
														<ExternalLink className="h-3 w-3" />
														{new URL(endpoint.body.url).hostname}
													</a>
												)}
											</div>
										</div>
									</div>

									{/* Details Grid */}
									<div className="mb-4 grid grid-cols-3 gap-4">
										<div className="rounded-lg bg-neutral-50 p-3">
											<p className="text-xs mb-1 text-neutral-500">Server</p>
											<p className="text-sm truncate font-medium text-neutral-900">
												{endpoint.resources.pipeline_server?.name || "Unknown"}
											</p>
											<p className="text-xs text-neutral-500">
												{endpoint.resources.pipeline_server?.body?.flavor_name}
											</p>
										</div>
										{endpoint.metadata?.endpoint_metadata?.port && (
											<div className="rounded-lg bg-neutral-50 p-3">
												<p className="text-xs mb-1 text-neutral-500">Port</p>
												<p className="text-sm font-medium text-neutral-900">
													{endpoint.metadata.endpoint_metadata.port}
												</p>
											</div>
										)}
										<div className="rounded-lg bg-neutral-50 p-3">
											<p className="text-xs mb-1 flex items-center gap-1 text-neutral-500">
												<Clock className="h-3 w-3" />
												Created
											</p>
											<p className="text-sm font-medium text-neutral-900">
												<DisplayDate dateString={endpoint.body.created} />
											</p>
										</div>
									</div>

									{endpoint.metadata?.endpoint_metadata?.container_id && (
										<div className="text-xs rounded inline-block bg-neutral-50 px-2 py-1 font-mono text-neutral-500">
											Container: {endpoint.metadata.endpoint_metadata.container_id.slice(0, 12)}...
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="flex gap-2">
									{endpoint.body.status === "running" ? (
										<>
											<Button
												size="md"
												intent="primary"
												emphasis="subtle"
												onClick={(e) => {
													e.stopPropagation();
													navigate(routes.projects.pipelineEndpoints.detail(endpoint.id));
												}}
												className="gap-2 rounded-md"
											>
												<Play className="h-4 w-4 fill-primary-600" />
												Execute
											</Button>
											<Button
												size="md"
												intent="primary"
												onClick={(e) => {
													e.stopPropagation();
													navigate(routes.projects.pipelineEndpoints.chat(endpoint.id));
												}}
												className="gap-2 rounded-md"
											>
												<MessageCircle className="h-4 w-4 fill-white" />
												Chat
											</Button>
										</>
									) : (
										<div className="text-sm rounded-md bg-neutral-100 px-4 py-2 font-medium text-neutral-500">
											{endpoint.body.status === "pending" ? "⏳ Starting..." : "💤 Inactive"}
										</div>
									)}
								</div>
							</div>
						</Box>
					))}
				</div>
			)}

			{/* Pagination */}
			{data && data.total_pages > 1 && (
				<div className="flex justify-center">
					<Pagination
						searchParams={Object.fromEntries(searchParams)}
						paginate={{
							index: data.current_page,
							total_pages: data.total_pages,
							total: data.total,
							max_size: data.size
						}}
					/>
				</div>
			)}
		</div>
	);
}
