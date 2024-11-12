import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const tabParamSchema = z.object({
	tab: z
		.enum(["configuration", "stacks", "runs"])
		.optional()
		.default("configuration")
		.catch("configuration")
});

export function useSelectedTab() {
	const [searchParams] = useSearchParams();
	const { tab } = tabParamSchema.parse({
		tab: searchParams.get("tab") || undefined
	});

	return tab;
}
