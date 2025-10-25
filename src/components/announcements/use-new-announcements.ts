import Items from "@/contents/whats-new.json";
import { useAnnouncementLastSeen } from "./use-last-seen";
import { AnnouncementKey } from "./persist-announcement";

export function useNewAnnouncements(key: AnnouncementKey) {
	const publishedItems = Items.entries.filter((item) => item.published);
	const lastSeenTimestamp = useAnnouncementLastSeen(key);

	// If lastSeenTimestamp is null, use 30 days ago as the fallback
	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	const newPublishedItems = publishedItems.filter(
		(item) => new Date(item.published_at).getTime() > (lastSeenTimestamp ?? thirtyDaysAgo)
	);

	return newPublishedItems;
}
