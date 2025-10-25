import { Announcements } from "@/data/announcements/announcement-schema";
import { AnnouncementKey } from "./persist-announcement";
import { useAnnouncementLastSeen } from "./use-last-seen";

export function useNewAnnouncements(
	key: AnnouncementKey,
	announcements: Announcements | undefined
) {
	const lastSeenTimestamp = useAnnouncementLastSeen(key);

	if (!announcements) return [];

	const publishedItems = announcements.filter((item) => item.published);

	// If lastSeenTimestamp is null, use 30 days ago as the fallback
	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	const newPublishedItems = publishedItems.filter(
		(item) => new Date(item.published_at).getTime() >= (lastSeenTimestamp ?? thirtyDaysAgo)
	);

	return newPublishedItems;
}
