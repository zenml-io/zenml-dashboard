import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const DEFAULT_PAGE = 1;

const runsFilterParamsSchema = z.object({
	page: z.coerce.number().min(DEFAULT_PAGE).optional().default(DEFAULT_PAGE).catch(DEFAULT_PAGE),
	name: z.string().optional(),
	operator: z.enum(["and", "or"]).optional(),
	status: z.enum(["pending", "running", "completed"]).optional() // Example: status filter
});

export function useRunsOverviewSearchParams(): PipelineRunOvervieweParams {
	const [searchParams] = useSearchParams();
	const { page, name, operator, status } = runsFilterParamsSchema.parse({
		page: searchParams.get("page") || undefined,
		name: searchParams.get("name") || undefined,
		operator: searchParams.get("operator") || undefined,
		status: searchParams.get("status") || undefined // Fetch status filter
	});

	return { page, name, logical_operator: operator, status }; // Include status in return
}
