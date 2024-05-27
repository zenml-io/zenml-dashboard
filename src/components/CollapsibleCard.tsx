import {
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsiblePanel,
	CollapsibleHeader,
	CollapsibleHeaderProps
} from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { useState } from "react";

type CollapsibleCardProps = {
	initialOpen?: boolean;
	children: React.ReactNode;
	title: string | React.ReactNode;
	className?: string;
	contentClassName?: string;
	intent?: CollapsibleHeaderProps["intent"];
};

export function CollapsibleCard({
	title,
	children,
	initialOpen = false,
	className,
	contentClassName,
	intent = "primary"
}: CollapsibleCardProps) {
	const [open, setOpen] = useState(initialOpen);
	return (
		<CollapsiblePanel className={className} open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent={intent}>
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					{title}
				</CollapsibleTrigger>
			</CollapsibleHeader>

			<CollapsibleContent
				className={cn(
					"space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3",
					contentClassName
				)}
			>
				{children}
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
