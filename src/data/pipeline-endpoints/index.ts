import {
	queryOptions,
	infiniteQueryOptions,
	useMutation,
	useQueryClient,
	useQuery
} from "@tanstack/react-query";
import { createApiPath, apiPaths } from "@/data/api";
import { fetcher } from "@/data/fetch";
import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import type {
	PipelineEndpoint,
	PipelineEndpointListParams,
	PipelineExecutionRequest,
	PipelineExecutionResponse,
	JobStatus,
	PipelineInfo
} from "@/types/pipeline-endpoints";

export interface PipelineEndpointListResponse {
	items: PipelineEndpoint[];
	total: number;
	total_pages: number;
	current_page: number;
	size: number;
}

// Fetch pipeline endpoints list
export async function fetchPipelineEndpoints(
	params: PipelineEndpointListParams = {}
): Promise<PipelineEndpointListResponse> {
	const url = createApiPath(apiPaths.pipelineEndpoints.all) + `?${objectToSearchParams(params)}`;
	const res = await fetcher(url, { method: "GET" });
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// Fetch single pipeline endpoint
export async function fetchPipelineEndpoint(endpointId: string): Promise<PipelineEndpoint> {
	const url = createApiPath(apiPaths.pipelineEndpoints.detail(endpointId));
	const res = await fetcher(url, { method: "GET" });
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// Execute pipeline endpoint
export async function executePipelineEndpoint(
	endpointId: string,
	executionRequest: PipelineExecutionRequest,
	mode: "sync" | "async" = "sync"
): Promise<PipelineExecutionResponse> {
	const url = createApiPath(apiPaths.pipelineEndpoints.execute(endpointId)) + `?mode=${mode}`;
	const res = await fetcher(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(executionRequest)
	});
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// Get job status from pipeline endpoint directly
export async function getJobStatus(endpointId: string, jobId: string): Promise<JobStatus> {
	// First get the pipeline endpoint to get its URL
	const endpoint = await fetchPipelineEndpoint(endpointId);

	if (!endpoint.body.url) {
		throw new FetchError({
			status: 400,
			statusText: "Bad Request",
			message: "Pipeline endpoint URL not available"
		});
	}

	// Call the pipeline endpoint directly
	const url = `${endpoint.body.url}/jobs/${jobId}`;
	const res = await fetcher(url, { method: "GET" });
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// List jobs for pipeline endpoint directly
export async function listPipelineEndpointJobs(
	endpointId: string,
	params: { status?: string; limit?: number } = {}
): Promise<{ jobs: JobStatus[]; total: number }> {
	// First get the pipeline endpoint to get its URL
	const endpoint = await fetchPipelineEndpoint(endpointId);

	if (!endpoint.body.url) {
		throw new FetchError({
			status: 400,
			statusText: "Bad Request",
			message: "Pipeline endpoint URL not available"
		});
	}

	// Call the pipeline endpoint directly
	const url = `${endpoint.body.url}/jobs?${objectToSearchParams(params)}`;
	const res = await fetcher(url, { method: "GET" });
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// Get pipeline info from the serving endpoint directly
export async function getPipelineEndpointInfo(endpointId: string): Promise<PipelineInfo> {
	// First get the pipeline endpoint to get its URL
	const endpoint = await fetchPipelineEndpoint(endpointId);

	if (!endpoint.body.url) {
		throw new FetchError({
			status: 400,
			statusText: "Bad Request",
			message: "Pipeline endpoint URL not available"
		});
	}

	// Call the pipeline endpoint's /info endpoint directly
	const url = `${endpoint.body.url}/info`;
	const res = await fetcher(url, { method: "GET" });
	if (!res.ok)
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: await res.text()
		});
	return res.json();
}

// Chat with pipeline (streaming)
export function createChatStream(endpointId: string): EventSource {
	const url = createApiPath(apiPaths.pipelineEndpoints.chat(endpointId));

	// For EventSource, we need to send data via URL params or use fetch with stream
	const eventSource = new EventSource(url, {
		withCredentials: true
	});

	return eventSource;
}

// Query options
export const pipelineEndpointQueries = {
	all: ["pipelineEndpoints"],

	pipelineEndpointList: (queryParams: PipelineEndpointListParams) =>
		queryOptions({
			queryKey: [...pipelineEndpointQueries.all, queryParams],
			queryFn: async () => fetchPipelineEndpoints(queryParams)
		}),

	pipelineEndpointListInfinite: (queryParams: PipelineEndpointListParams) =>
		infiniteQueryOptions({
			queryKey: [...pipelineEndpointQueries.all, "infinite", queryParams],
			queryFn: async ({ pageParam }) => fetchPipelineEndpoints({ ...queryParams, page: pageParam }),
			getNextPageParam: (lastPage) =>
				lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : null,
			initialPageParam: 1
		}),

	pipelineEndpointDetail: (endpointId: string) =>
		queryOptions({
			queryKey: [...pipelineEndpointQueries.all, "detail", endpointId],
			queryFn: async () => fetchPipelineEndpoint(endpointId)
		}),

	jobStatus: (endpointId: string, jobId: string) =>
		queryOptions({
			queryKey: [...pipelineEndpointQueries.all, "job", endpointId, jobId],
			queryFn: async () => getJobStatus(endpointId, jobId),
			refetchInterval: (query) => {
				// Only poll if job is still running
				return query.state.data?.status === "running" ? 2000 : false;
			}
		}),

	jobList: (endpointId: string, params: { status?: string; limit?: number } = {}) =>
		queryOptions({
			queryKey: [...pipelineEndpointQueries.all, "jobs", endpointId, params],
			queryFn: async () => listPipelineEndpointJobs(endpointId, params),
			retry: 2, // Retry failed requests since we're calling external URL
			refetchInterval: 10000 // Refresh every 10 seconds to show new jobs
		}),

	pipelineInfo: (endpointId: string) =>
		queryOptions({
			queryKey: [...pipelineEndpointQueries.all, "info", endpointId],
			queryFn: async () => getPipelineEndpointInfo(endpointId),
			retry: 2, // Retry failed requests since we're calling external URL
			staleTime: 5 * 60 * 1000, // Cache for 5 minutes since pipeline info doesn't change often
			refetchOnWindowFocus: false // Don't refetch when window is focused
		})
};

// React Query Hooks
export function usePipelineEndpoint(endpointId: string) {
	return useQuery(pipelineEndpointQueries.pipelineEndpointDetail(endpointId));
}

export function usePipelineEndpointList(params: PipelineEndpointListParams = {}) {
	return useQuery(pipelineEndpointQueries.pipelineEndpointList(params));
}

export function useJobStatus(endpointId: string, jobId: string, enabled: boolean = true) {
	return useQuery({
		...pipelineEndpointQueries.jobStatus(endpointId, jobId),
		enabled
	});
}

export function usePipelineEndpointJobs(
	endpointId: string,
	params: { status?: string; limit?: number } = {}
) {
	return useQuery(pipelineEndpointQueries.jobList(endpointId, params));
}

export function usePipelineEndpointInfo(endpointId: string) {
	return useQuery(pipelineEndpointQueries.pipelineInfo(endpointId));
}

// Mutations
export function useExecutePipelineEndpoint() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			endpointId,
			executionRequest,
			mode = "sync"
		}: {
			endpointId: string;
			executionRequest: PipelineExecutionRequest;
			mode?: "sync" | "async";
		}) => executePipelineEndpoint(endpointId, executionRequest, mode),

		onSuccess: (data, variables) => {
			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: [...pipelineEndpointQueries.all, "detail", variables.endpointId]
			});

			// If async execution, start polling job status
			if (data.job_id && variables.mode === "async") {
				queryClient.invalidateQueries({
					queryKey: [...pipelineEndpointQueries.all, "job", variables.endpointId, data.job_id]
				});
			}
		}
	});
}

// Chat with pipeline using fetch streaming
export function useChatWithPipeline() {
	return useMutation({
		mutationFn: async ({
			endpointId,
			message,
			history = [],
			onChunk
		}: {
			endpointId: string;
			message: string;
			history?: any[];
			onChunk: (chunk: string) => void;
		}) => {
			const url = createApiPath(apiPaths.pipelineEndpoints.chat(endpointId));
			const response = await fetcher(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message, history, stream: true })
			});

			if (!response.ok) {
				throw new FetchError({
					status: response.status,
					statusText: response.statusText,
					message: await response.text()
				});
			}

			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error("No response body reader available");
			}

			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: readerDone } = await reader.read();
				done = readerDone;

				if (value) {
					const chunk = decoder.decode(value, { stream: true });
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const data = line.slice(6).trim();
							if (data && data !== "[DONE]") {
								try {
									const parsed = JSON.parse(data);
									if (parsed.content) {
										onChunk(parsed.content);
									} else if (parsed.error) {
										throw new Error(parsed.error);
									} else if (parsed.done) {
										// Stream completed successfully
										done = true;
										break;
									}
								} catch (e) {
									if (e instanceof Error && e.message.includes("error")) {
										throw e;
									}
									// Handle non-JSON chunks
									onChunk(data);
								}
							}
						}
					}
				}
			}
		}
	});
}

export function useGetPipelineEndpointLogs() {
	return useMutation({
		mutationFn: async ({
			endpointId,
			follow = false,
			tail,
			onLog,
			onError
		}: {
			endpointId: string;
			follow?: boolean;
			tail?: number;
			onLog: (log: string) => void;
			onError?: (error: string) => void;
		}) => {
			const searchParams = new URLSearchParams();
			if (follow) searchParams.set("follow", "true");
			if (tail) searchParams.set("tail", tail.toString());

			const url =
				createApiPath(apiPaths.pipelineEndpoints.logs(endpointId)) +
				(searchParams.toString() ? `?${searchParams.toString()}` : "");

			const response = await fetcher(url, {
				method: "GET",
				headers: { Accept: "text/event-stream" }
			});

			if (!response.ok) {
				throw new FetchError({
					status: response.status,
					statusText: response.statusText,
					message: await response.text()
				});
			}

			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error("No response body reader available");
			}

			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: readerDone } = await reader.read();
				done = readerDone;

				if (value) {
					const chunk = decoder.decode(value, { stream: true });
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const data = line.slice(6).trim();
							if (data && data !== "[DONE]") {
								try {
									const parsed = JSON.parse(data);
									if (parsed.log) {
										onLog(parsed.log);
									} else if (parsed.error) {
										onError?.(parsed.error);
									} else if (parsed.done) {
										// Stream completed successfully
										done = true;
										break;
									}
								} catch (e) {
									if (e instanceof Error && e.message.includes("error")) {
										onError?.(e.message);
									} else {
										// Handle non-JSON chunks
										onLog(data);
									}
								}
							}
						}
					}
				}
			}
		}
	});
}
