import { Announcement } from "@/data/announcements/announcement-schema";

type getFilteredAnnouncementsParams = {
	announcements: Announcement[];
	searchQuery: string;
};

export function getFilteredAnnouncements({
	announcements,
	searchQuery
}: getFilteredAnnouncementsParams) {
	const filtered = announcements.filter((announcement) => {
		return announcement.title.toLowerCase().includes(searchQuery.toLowerCase());
	});

	// Sort by published_at date in descending order (newest first)
	return filtered.sort((a, b) => {
		return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
	});
}
