import {
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsiblePanel,
	CollapsibleHeader,
	CollapsibleHeaderProps
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { Icon } from "./Icon";

type CollapsibleCardProps = {
	initialOpen?: boolean;
	children: React.ReactNode;
	title: string | React.ReactNode;
	className?: string;
	intent?: CollapsibleHeaderProps["intent"];
};

export function CollapsibleCard({
	title,
	children,
	initialOpen = false,
	className,
	intent = "primary"
}: CollapsibleCardProps) {
	const [open, setOpen] = useState(initialOpen);
	return (
		<CollapsiblePanel className={className} open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent={intent}>
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<Icon
						name="chevron-down"
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					{title}
				</CollapsibleTrigger>
			</CollapsibleHeader>

			<CollapsibleContent className="space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				{children}
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
