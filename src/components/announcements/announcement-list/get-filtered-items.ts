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
	return filtered;
}
