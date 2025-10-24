import Items from "@/contents/whats-new.json";
import { useAnnouncementLastSeen } from "./use-last-seen";

export function useNewAnnouncements() {
	const publishedItems = Items.entries.filter((item) => item.published);
	const { lastSeenDate } = useAnnouncementLastSeen();

	const newPublishedItems = publishedItems.filter(
		(item) => new Date(item.published_at) > (lastSeenDate ?? new Date(0))
	);

	return newPublishedItems;
}
