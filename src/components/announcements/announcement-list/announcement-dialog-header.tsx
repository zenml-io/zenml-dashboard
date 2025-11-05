import X from "@/assets/icons/close.svg?react";
import Search from "@/assets/icons/search.svg?react";
import { Button, DialogClose, DialogTitle } from "@zenml-io/react-component-library";

type Props = {
	searchOpen: boolean;
	toggleSearch: () => void;
};

export function AnnouncementDialogHeader({ searchOpen, toggleSearch }: Props) {
	return (
		<div className="flex items-center justify-between border-b border-theme-border-moderate px-5 py-3">
			<DialogTitle className="text-text-lg font-semibold">What's new</DialogTitle>
			<div className="flex items-center gap-2">
				<Button
					onClick={toggleSearch}
					data-state={searchOpen ? "on" : "off"}
					aria-pressed={searchOpen}
					intent="secondary"
					className="flex aspect-square size-6 items-center justify-center p-0"
					emphasis="minimal"
					size="md"
				>
					<Search className="size-5 shrink-0 fill-theme-text-secondary" />
					<span className="sr-only">Search</span>
				</Button>
				<DialogClose asChild>
					<Button
						intent="secondary"
						className="flex aspect-square size-6 items-center justify-center p-0"
						emphasis="minimal"
						size="md"
					>
						<X className="size-5 shrink-0 fill-theme-text-secondary" />
						<span className="sr-only">Close</span>
					</Button>
				</DialogClose>
			</div>
		</div>
	);
}
