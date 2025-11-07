import { useRef } from "react";
import { AnnouncementList } from "@/data/announcements/announcement-schema";
import { AnnouncementKey, announcementStore } from "./persist-announcement";
import { useAnnouncementLastSeen } from "./use-last-seen";

export function useNewAnnouncements(
	key: AnnouncementKey,
	announcements: AnnouncementList | undefined,
	blockFirstVisit: boolean
) {
	const lastSeenTimestamp = useAnnouncementLastSeen(key);
	const justInitialized = useRef(false);

	if (!announcements) return [];

	// If lastSeenTimestamp is null, use 30 days ago as the fallback
	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	if (lastSeenTimestamp === null) {
		if (blockFirstVisit && !justInitialized.current) {
			announcementStore.setAnnouncementLastSeenTimestamp(key, thirtyDaysAgo);
			justInitialized.current = true;
		}
	}

	// If we just set the timestamp in THIS session, still return empty
	// even though localStorage now has a value (due to re-renders/StrictMode)
	if (justInitialized.current && blockFirstVisit) {
		return [];
	}

	const newPublishedItems = announcements.filter(
		(item) => new Date(item.published_at).getTime() >= (lastSeenTimestamp ?? thirtyDaysAgo)
	);
	return newPublishedItems;
}
