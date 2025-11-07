import { AnnouncementList } from "@/data/announcements/announcement-schema";
import { AnnouncementKey, announcementStore } from "./persist-announcement";
import { useAnnouncementLastSeen } from "./use-last-seen";

export function useNewAnnouncements(
	key: AnnouncementKey,
	announcements: AnnouncementList | undefined,
	setDate: boolean
) {
	const lastSeenTimestamp = useAnnouncementLastSeen(key);

	if (!announcements) return [];

	if (lastSeenTimestamp === null) {
		if (setDate) {
			announcementStore.setAnnouncementLastSeen(key);
			return [];
		}
	}

	// If lastSeenTimestamp is null, use 30 days ago as the fallback
	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	const newPublishedItems = announcements.filter(
		(item) => new Date(item.published_at).getTime() >= (lastSeenTimestamp ?? thirtyDaysAgo)
	);
	return newPublishedItems;
}
