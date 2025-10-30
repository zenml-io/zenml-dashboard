import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsibleHeaderProps,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";
import { useState } from "react";
import { CopyMetadataButton } from "./copy-metadata-button";

type CollapsibleCardProps = {
	initialOpen?: boolean;
	children: React.ReactNode;
	title: React.ReactNode;
	className?: string;
	contentClassName?: string;
	intent?: CollapsibleHeaderProps["intent"];
	headerClassName?: string;
	headerChildren?: React.ReactNode;
};

export function CollapsibleCard({
	title,
	children,
	initialOpen = false,
	className,
	contentClassName,
	intent = "primary",
	headerClassName,
	headerChildren
}: CollapsibleCardProps) {
	const [open, setOpen] = useState(initialOpen);
	return (
		<CollapsiblePanel className={className} open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent={intent} className={headerClassName}>
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					{title}
				</CollapsibleTrigger>

				{headerChildren}
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

type Props = Omit<CollapsibleCardProps, "headerChildren"> & {
	copyText: string;
	displayCopyButton?: boolean;
};

export function CollapsibleCardWithCopy({
	copyText,
	displayCopyButton = true,
	headerClassName,
	className,
	...props
}: Props) {
	return (
		<CollapsibleCard
			{...props}
			className={cn("group", className)}
			headerClassName={cn(
				"flex flex-col lg:flex-row items-start lg:items-center gap-2",
				headerClassName
			)}
			headerChildren={
				displayCopyButton ? (
					<div className="opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100">
						<CopyMetadataButton copyText={copyText} />
					</div>
				) : null
			}
		></CollapsibleCard>
	);
}
