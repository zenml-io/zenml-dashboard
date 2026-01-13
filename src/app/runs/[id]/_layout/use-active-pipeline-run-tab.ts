import { useRouteSegment } from "@/hooks/use-route-segment";

export type TabValue = "visualization" | "logs";

export function useActivePipelineRunTab() {
	const segment = (useRouteSegment(4) as TabValue) || "visualization";

	return segment;
}
