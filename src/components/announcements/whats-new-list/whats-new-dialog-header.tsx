import X from "@/assets/icons/close.svg?react";
import { Button, DialogClose, DialogTitle } from "@zenml-io/react-component-library";

export function WhatsNewDialogHeader() {
	return (
		<div className="flex items-center justify-between px-5 py-3">
			<DialogTitle className="text-text-lg font-semibold">What's new</DialogTitle>
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
	);
}
