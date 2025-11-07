import { useMemo, useState, useCallback } from "react";
import { Announcement } from "@/types/announcements";
import { getFilteredAnnouncements } from "./get-filtered-items";

export type UseAnnouncementSearchReturn = {
	searchOpen: boolean;
	setSearchOpen: (open: boolean) => void;
	toggleSearch: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	filteredAnnouncements: Announcement[];
};

export function useAnnouncementSearch(announcements: Announcement[]): UseAnnouncementSearchReturn {
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredAnnouncements = useMemo(() => {
		return getFilteredAnnouncements({
			announcements,
			searchQuery
		});
	}, [announcements, searchQuery]);

	const toggleSearch = useCallback(() => {
		setSearchOpen((prev) => {
			const newValue = !prev;
			// Clear search when closing
			if (!newValue) {
				setSearchQuery("");
			}
			return newValue;
		});
	}, []);

	return {
		searchOpen,
		setSearchOpen,
		toggleSearch,
		searchQuery,
		setSearchQuery,
		filteredAnnouncements
	};
}
