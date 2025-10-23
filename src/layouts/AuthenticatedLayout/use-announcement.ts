import { useState } from "react";
import { setAnnouncementLastSeen } from "@/components/announcements/persist-announcement";

export function useAnnouncement() {
	const [open, setOpen] = useState(false);

	function openAnnouncement() {
		setAnnouncementLastSeen();
		setOpen(true);
	}

	function setIsAnnouncementOpen(open: boolean) {
		setAnnouncementLastSeen();
		setOpen(open);
	}

	return {
		isAnnouncementOpen: open,
		openAnnouncement,
		setIsAnnouncementOpen
	};
}
