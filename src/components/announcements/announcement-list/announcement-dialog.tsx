import { useAnnouncements } from "@/data/announcements/announcements";
import { Dialog, DialogContent, DialogDescription } from "@zenml-io/react-component-library";
import { AnnouncementDialogHeader } from "./announcement-dialog-header";
import { AnnouncementDialogSearchBar } from "./announcement-dialog-search-bar";
import { AnnouncementEmptyState } from "./announcement-empty-state";
import { AnnouncementItem } from "./announcement-item";
import { useAnnouncementSearch } from "./use-announcement-search";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function AnnouncementDialog({ open, setOpen }: Props) {
	const announcementsQuery = useAnnouncements();

	const publishedItems = announcementsQuery.isSuccess
		? announcementsQuery.data.filter((item) => item.published)
		: [];

	const { searchOpen, toggleSearch, searchQuery, setSearchQuery, filteredAnnouncements } =
		useAnnouncementSearch(publishedItems);

	if (announcementsQuery.isPending) return null;
	if (announcementsQuery.isError) return null;

	const isEmpty = publishedItems.length <= 1;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex max-h-[600px] max-w-[600px] flex-col">
				<AnnouncementDialogHeader searchOpen={searchOpen} toggleSearch={toggleSearch} />
				<DialogDescription className="sr-only">Whats' new in ZenML</DialogDescription>
				{searchOpen && (
					<AnnouncementDialogSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				)}
				{isEmpty || filteredAnnouncements.length === 0 ? (
					<AnnouncementEmptyState />
				) : (
					<ul className="space-y-8 overflow-y-auto p-5">
						{filteredAnnouncements.map((item) => (
							<li key={item.id}>
								<AnnouncementItem key={item.id} item={item} />
							</li>
						))}
					</ul>
				)}
			</DialogContent>
		</Dialog>
	);
}
