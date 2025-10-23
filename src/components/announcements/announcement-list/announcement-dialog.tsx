import Items from "@/contents/whats-new.json";
import { Dialog, DialogContent, DialogDescription } from "@zenml-io/react-component-library";
import { AnnouncementDialogHeader } from "./announcement-dialog-header";
import { AnnouncementItem } from "./announcement-item";
import { AnnouncementEmptyState } from "./announcement-empty-state";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function AnnouncementDialog({ open, setOpen }: Props) {
	const publishedItems = Items.entries.filter((item) => item.published);

	const isEmpty = publishedItems.length <= 1;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex max-h-[600px] max-w-[600px] flex-col">
				<AnnouncementDialogHeader />
				<DialogDescription className="sr-only">Whats' new in ZenML</DialogDescription>
				{isEmpty ? (
					<AnnouncementEmptyState />
				) : (
					<ul className="space-y-8 overflow-y-auto p-5">
						{publishedItems.map((item) => (
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
