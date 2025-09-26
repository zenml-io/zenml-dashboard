import { useRouteSegment } from "@/hooks/use-route-segment";

type Tabs = "overview";

export function useActiveTab() {
	const activeTab = (useRouteSegment(4) || "overview") as Tabs;
	return activeTab;
}
