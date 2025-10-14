import { CollapsibleChevron } from "@/components/collapsible-chevron";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@zenml-io/react-component-library/utilities";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
	title: string;
};

export function PlaygroundValueCollapsible({ open, className, title, children, ...rest }: Props) {
	return (
		<CollapsiblePrimitive.Root className={cn("space-y-3", className)} {...rest}>
			<CollapsiblePrimitive.Trigger className="flex items-center gap-1">
				<CollapsibleChevron className="size-3" open={open ?? false} /> {title}
			</CollapsiblePrimitive.Trigger>
			<CollapsiblePrimitive.Content className="pl-5">{children}</CollapsiblePrimitive.Content>
		</CollapsiblePrimitive.Root>
	);
}
