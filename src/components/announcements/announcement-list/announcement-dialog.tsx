import { useAnnouncements } from "@/data/announcements/announcements";
import { Dialog, DialogContent, DialogDescription } from "@zenml-io/react-component-library";
import { useMemo } from "react";
import { AnnouncementDialogHeader } from "./announcement-dialog-header";
import { AnnouncementDialogSearchBar } from "./announcement-dialog-search-bar";
import { AnnouncementErrorState, NoAnnouncementEmptyState } from "./announcement-empty-state";
import { AnnouncementItem } from "./announcement-item";
import { useAnnouncementSearch } from "./use-announcement-search";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function AnnouncementDialog({ open, setOpen }: Props) {
	const announcementsQuery = useAnnouncements();

	const publishedItems = useMemo(
		() =>
			announcementsQuery.isSuccess ? announcementsQuery.data.filter((item) => item.published) : [],
		[announcementsQuery.isSuccess, announcementsQuery.data]
	);

	const { searchOpen, toggleSearch, searchQuery, setSearchQuery, filteredAnnouncements } =
		useAnnouncementSearch(publishedItems);

	if (announcementsQuery.isPending) return null;

	const isEmpty = publishedItems.length <= 1;
	const showEmptyState = isEmpty || filteredAnnouncements.length === 0;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex max-h-[600px] max-w-[600px] flex-col">
				<AnnouncementDialogHeader searchOpen={searchOpen} toggleSearch={toggleSearch} />
				<DialogDescription className="sr-only">What's new in ZenML</DialogDescription>
				{announcementsQuery.isError ? (
					<AnnouncementErrorState />
				) : (
					<>
						{searchOpen && (
							<AnnouncementDialogSearchBar
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
							/>
						)}
						{showEmptyState ? (
							<NoAnnouncementEmptyState />
						) : (
							<ul className="space-y-8 overflow-y-auto p-5">
								{filteredAnnouncements.map((item) => (
									<li key={item.id}>
										<AnnouncementItem item={item} />
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
