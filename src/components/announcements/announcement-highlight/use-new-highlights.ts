import { AnnouncementList } from "@/types/announcements";
import { useNewAnnouncements } from "../use-new-announcements";

export function useNewAnnouncementHighlights(announcements: AnnouncementList | undefined) {
	const newPublishedItems = useNewAnnouncements("lastSeenHighlights", announcements, true);

	if (!announcements) return [];

	const currentTime = new Date();

	return newPublishedItems.filter((item) => {
		if (!item.should_highlight) return false;

		// If highlight_until is set, check if we're still within the highlight period
		if (item.highlight_until) {
			const highlightUntil = new Date(item.highlight_until);
			return currentTime < highlightUntil;
		}

		return true;
	});
}
