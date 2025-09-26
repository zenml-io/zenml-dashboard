import { useRouteSegment } from "@/hooks/use-route-segment";

type Tabs = "overview" | "runs";

export function useActiveTab() {
	const activeTab = (useRouteSegment(4) || "overview") as Tabs;
	return activeTab;
}
