import DoubleChevronRight from "@/assets/icons/chevron-right-double.svg?react";
import { SheetClose } from "@zenml-io/react-component-library";

export function SheetHeader() {
	return (
		<div className="flex h-9 items-center border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-3">
			<SheetClose className="focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
				<DoubleChevronRight className="h-5 w-5 fill-neutral-500" />
				<span className="sr-only">Close</span>
			</SheetClose>
		</div>
	);
}
