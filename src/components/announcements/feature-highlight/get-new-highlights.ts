import Items from "@/contents/whats-new.json";
import { useLastSeen } from "../use-last-seen";

export function useNewChangelogHighlights() {
	const featureHighlights = Items.entries
		.filter((item) => item.published)
		.filter((item) => item.should_highlight);
	const { lastSeenDate } = useLastSeen();

	const newFeatureHighlights = featureHighlights.filter(
		(item) => new Date(item.published_at) > (lastSeenDate ?? new Date(0))
	);

	return newFeatureHighlights;
}
