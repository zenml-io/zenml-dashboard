export type DeploymentInvocationRequest = {
	/** PipelineInput */
	parameters: unknown;
	/** Custom name for the pipeline run. */
	run_name?: string | null;
	/**
	 * The timeout for the pipeline execution.
	 * @default 300
	 */
	timeout?: number;
	/**
	 * Whether to keep outputs in memory for fast access instead of storing them as artifacts.
	 * @default false
	 */
	skip_artifact_materialization?: boolean;
};

export type DeploymentInvocationResponse = {
	/** Whether the pipeline execution was successful. */
	success: boolean;
	/** PipelineOutput */
	outputs: unknown;
	/** The time taken to execute the pipeline. */
	execution_time: number;
	/** The metadata of the pipeline execution. */
	metadata: DeploymentInvocationMetadata;
	/** The error that occurred, if the pipeline invocation failed. */
	error?: string | null;
};

type DeploymentInvocationMetadata = {
	/**
	 * The ID of the deployment.
	 * Format: uuid
	 */
	deployment_id: string;
	/** The name of the deployment. */
	deployment_name: string;
	/**
	 * The ID of the snapshot.
	 * Format: uuid
	 */
	snapshot_id: string;
	/** The name of the snapshot. */
	snapshot_name?: string | null;
	/** The name of the pipeline. */
	pipeline_name: string;
	/** The ID of the pipeline run. */
	run_id?: string | null;
	/** The name of the pipeline run. */
	run_name?: string | null;
	/** The parameters used for the pipeline execution. */
	parameters_used: {
		[key: string]: unknown;
	};
};

export type InvocationValidationError = {
	/** Detail */
	detail?: InvocationValidationErrorDetail[];
};

type InvocationValidationErrorDetail = {
	/** Location */
	loc: (string | number)[];
	/** Message */
	msg: string;
	/** Error Type */
	type: string;
};
