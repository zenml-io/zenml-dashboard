import { useRouteSegment } from "@/hooks/use-route-segment";

type Tabs = "overview";

export function useActiveTab() {
	const activeTab = (useRouteSegment(4) || "runs") as Tabs;
	return activeTab;
}
