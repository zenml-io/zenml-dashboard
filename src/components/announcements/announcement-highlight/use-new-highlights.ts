import { Announcements } from "@/data/announcements/announcement-schema";
import { useNewAnnouncements } from "../use-new-announcements";

export function useNewAnnouncementHighlights(announcements: Announcements | undefined) {
	const newPublishedItems = useNewAnnouncements("lastSeenHighlights", announcements, true);

	if (!announcements) return [];

	return newPublishedItems.filter((item) => item.should_highlight);
}
