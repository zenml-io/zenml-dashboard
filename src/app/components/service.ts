import { z } from "zod";
import { StackComponentListParams } from "@/types/components";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;

const filterParamsSchema = z.object({
	page: z.coerce.number().min(DEFAULT_PAGE).optional().default(DEFAULT_PAGE).catch(DEFAULT_PAGE),
	name: z.string().optional(),
	operator: z.enum(["and", "or"]).optional()
});

export function useComponentlistQueryParams(): StackComponentListParams {
	const [searchParams] = useSearchParams();

	const { page, name, operator } = filterParamsSchema.parse({
		page: searchParams.get("page") || undefined,
		name: searchParams.get("name") || undefined
	});

	return { page, name, logical_operator: operator };
}
