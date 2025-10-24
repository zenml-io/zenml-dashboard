import { useState } from "react";
import { announcementStore } from "@/components/announcements/persist-announcement";

export function useAnnouncement() {
	const [open, setOpen] = useState(false);

	function openAnnouncement() {
		announcementStore.setAnnouncementLastSeen();
		setOpen(true);
	}

	function setIsAnnouncementOpen(open: boolean) {
		announcementStore.setAnnouncementLastSeen();
		setOpen(open);
	}

	return {
		isAnnouncementOpen: open,
		openAnnouncement,
		setIsAnnouncementOpen
	};
}
