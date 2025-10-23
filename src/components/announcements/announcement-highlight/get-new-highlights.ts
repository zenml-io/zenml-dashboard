import Items from "@/contents/whats-new.json";
import { useAnnouncementLastSeen } from "../use-last-seen";

export function useNewAnnouncementHighlights() {
	const featureHighlights = Items.entries
		.filter((item) => item.published)
		.filter((item) => item.should_highlight);
	const { lastSeenDate } = useAnnouncementLastSeen();

	const newFeatureHighlights = featureHighlights.filter(
		(item) => new Date(item.published_at) > (lastSeenDate ?? new Date(0))
	);

	return newFeatureHighlights;
}
