import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const tabParamSchema = z.object({
	tab: z
		.enum(["overview", "configuration", "metadata"])
		.optional()
		.default("overview")
		.catch("overview")
});

export function useSelectedTab() {
	const [searchParams] = useSearchParams();
	const { tab } = tabParamSchema.parse({
		tab: searchParams.get("tab") || undefined
	});

	return tab;
}
