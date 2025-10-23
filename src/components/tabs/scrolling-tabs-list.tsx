import type { TabsListProps } from "@radix-ui/react-tabs";
import { TabsList } from "@zenml-io/react-component-library";
import { cn, ScrollArea, ScrollBar } from "@zenml-io/react-component-library";
import { forwardRef } from "react";

export const ScrollingTabsList = forwardRef<HTMLDivElement, TabsListProps>(
	({ children, className, ...props }, ref) => {
		return (
			<ScrollArea>
				<TabsList ref={ref} className={cn("w-full flex-nowrap", className)} {...props}>
					{children}
				</TabsList>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		);
	}
);

ScrollingTabsList.displayName = "ScrollingTabsList";
