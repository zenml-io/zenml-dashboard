import ChevronDown from "@/assets/icons/chevron-down.svg?react";

type Props = {
	open: boolean;
};

export function CollapsibleChevron({ open }: Props) {
	return (
		<ChevronDown
			className={` ${
				open ? "" : "-rotate-90"
			} size-5 shrink-0 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
		/>
	);
}
