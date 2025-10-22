import Items from "@/contents/whats-new.json";
import { Dialog, DialogContent, DialogDescription } from "@zenml-io/react-component-library";
import { ChangelogItem } from "./changelog-item";
import { WhatsNewDialogHeader } from "./whats-new-dialog-header";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export function WhatsNewDialog({ open, setOpen }: Props) {
	const publishedItems = Items.entries.filter((item) => item.published);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex max-h-[600px] max-w-[600px] flex-col">
				<WhatsNewDialogHeader />
				<DialogDescription className="sr-only">Whats' new in ZenML</DialogDescription>
				<ul className="space-y-8 overflow-y-auto p-5">
					{publishedItems.map((item) => (
						<li key={item.id}>
							<ChangelogItem key={item.id} item={item} />
						</li>
					))}
				</ul>
			</DialogContent>
		</Dialog>
	);
}
