import { useNewAnnouncements } from "../use-new-announcements";

export function useNewAnnouncementHighlights() {
	const newPublishedItems = useNewAnnouncements();
	return newPublishedItems.filter((item) => item.should_highlight);
}
