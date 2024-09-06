import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const tabParamSchema = z.object({
	tab: z.enum(["pipelines", "runs"]).optional().default("pipelines").catch("pipelines")
});

export function useSelectedTab() {
	const [searchParams] = useSearchParams();
	const { tab } = tabParamSchema.parse({
		tab: searchParams.get("tab") || undefined
	});

	return tab;
}
