export interface PipelineEndpoint {
	id: string;
	name: string;
	permission_denied: boolean;
	body: {
		created: string;
		updated: string;
		user_id: string;
		project_id: string;
		url?: string;
		status: PipelineEndpointStatus;
	};
	metadata?: {
		pipeline_deployment_id?: string;
		pipeline_server_id?: string;
		endpoint_metadata?: {
			port?: number;
			container_id?: string;
			container_name?: string;
			container_image_id?: string;
			container_image_uri?: string;
			container_status?: string;
		};
	};
	resources: {
		user?: {
			id: string;
			name: string;
			permission_denied: boolean;
			body: {
				created: string;
				updated: string;
				active: boolean;
				activation_token?: string;
				full_name?: string;
				email_opted_in: boolean;
				is_service_account: boolean;
				is_admin: boolean;
				default_project_id?: string;
				avatar_url?: string;
			};
			metadata?: any;
			resources?: any;
		};
		pipeline_deployment?: {
			id: string;
			permission_denied: boolean;
			body: {
				created: string;
				updated: string;
				user_id: string;
				project_id: string;
			};
			metadata?: any;
			resources?: any;
		};
		pipeline_server?: {
			id: string;
			name: string;
			permission_denied: boolean;
			body: {
				created: string;
				updated: string;
				user_id: string;
				type: string;
				flavor_name: string;
				integration: string;
				logo_url?: string;
			};
			metadata?: any;
			resources?: any;
		};
	};
}

export type PipelineEndpointStatus = "pending" | "running" | "stopped" | "error";

export interface PipelineEndpointListParams extends Record<string, unknown> {
	page?: number;
	size?: number;
	name?: string;
	status?: PipelineEndpointStatus;
	project?: string;
	sort_by?: string;
	logical_operator?: "and" | "or";
}

export interface PipelineExecutionRequest {
	parameters: Record<string, any>;
	run_name?: string;
	config_path?: string;
	enable_cache?: boolean;
}

export interface PipelineExecutionResponse {
	success: boolean;
	job_id?: string;
	run_id?: string;
	message?: string;
	error?: string;
	result?: Record<string, any>;
}

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	timestamp?: string;
}

export interface ChatRequest {
	message: string;
	history?: ChatMessage[];
	stream?: boolean;
}

export interface JobStatus {
	job_id: string;
	status: "pending" | "running" | "completed" | "failed" | "canceled";
	parameters: Record<string, any>;
	run_name?: string;
	created_at: string;
	started_at?: string;
	completed_at?: string;
	error?: string;
	result?: any;
	execution_time?: number;
	pipeline_name?: string;
	steps_executed: number;
	canceled_by?: string;
	cancel_reason?: string;
}

export interface PipelineParameterSchema {
	type: string;
	default?: any;
	required: boolean;
}

export interface PipelineInfo {
	pipeline: {
		name: string;
		steps: string[];
		parameters: Record<string, PipelineParameterSchema>;
	};
	deployment: {
		id: string;
		created_at: string;
		stack: string;
	};
}
