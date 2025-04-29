import DoubleChevronRight from "@/assets/icons/chevron-right-double.svg?react";
import { Button, cn, SheetClose } from "@zenml-io/react-component-library";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function SheetHeader({ className, children, ...props }: Props) {
	return (
		<div
			className={cn(
				"flex h-9 items-center border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-3",
				className
			)}
			{...props}
		>
			<SheetClose asChild>
				<Button
					type="button"
					className="flex aspect-square items-center justify-center p-0"
					intent="secondary"
					emphasis="minimal"
				>
					<DoubleChevronRight className="h-5 w-5 fill-neutral-500" />
					<span className="sr-only">Close</span>
				</Button>
			</SheetClose>
			{children}
		</div>
	);
}
