import { useState } from "react";
import { setChangelogLastSeen } from "@/components/announcements/persist-changelog";

export function useChangelog() {
	const [open, setOpen] = useState(false);

	function openChangelog() {
		setChangelogLastSeen();
		setOpen(true);
	}

	function setIsChangelogOpen(open: boolean) {
		setChangelogLastSeen();
		setOpen(open);
	}

	return {
		isChangelogOpen: open,
		openChangelog,
		setIsChangelogOpen
	};
}
