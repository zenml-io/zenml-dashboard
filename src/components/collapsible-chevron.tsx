import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { cn } from "@zenml-io/react-component-library/utilities";

type Props = {
	open: boolean;
	className?: string;
};

export function CollapsibleChevron({ open, className }: Props) {
	return (
		<ChevronDown
			className={cn(
				` ${
					open ? "" : "-rotate-90"
				} size-5 shrink-0 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`,
				className
			)}
		/>
	);
}
