import { components, operations } from "./core";

export type Step = components["schemas"]["StepRunResponse"];

export type StepDict = Record<string, Step>;

export type StepLogsQueries = NonNullable<
	operations["get_step_logs_api_v1_steps__step_id__logs_get"]["parameters"]["query"]
>;
