import { CollapsibleChevron } from "@/components/collapsible-chevron";
import * as CollapsiblePrmiitive from "@radix-ui/react-collapsible";
import { cn } from "@zenml-io/react-component-library/utilities";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof CollapsiblePrmiitive.Root> & {
	title: string;
};

export function PlaygroundValueCollapsible({ open, className, title, children, ...rest }: Props) {
	return (
		<CollapsiblePrmiitive.Root className={cn("space-y-3", className)} {...rest}>
			<CollapsiblePrmiitive.Trigger className="flex items-center gap-1">
				<CollapsibleChevron className="size-3" open={open ?? false} /> {title}
			</CollapsiblePrmiitive.Trigger>
			<CollapsiblePrmiitive.Content className="pl-5">{children}</CollapsiblePrmiitive.Content>
		</CollapsiblePrmiitive.Root>
	);
}
