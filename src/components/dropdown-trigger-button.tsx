import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import { Button, cn } from "@zenml-io/react-component-library";
import { ComponentProps, forwardRef } from "react";

type Props = Omit<ComponentProps<typeof Button>, "intent" | "emphasis">;

/**
 * Reusable dropdown trigger button with dots icon.
 * Use children for screen-reader accessible labels (e.g., <span className="sr-only">Open component dropdown</span>)
 */
export const DropdownTriggerButton = forwardRef<HTMLButtonElement, Props>(
	({ children, className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				intent="secondary"
				emphasis="minimal"
				className={cn("flex aspect-square size-6 items-center justify-center p-0", className)}
				{...props}
			>
				<DotsIcon className="h-5 w-5 shrink-0 fill-theme-text-secondary" />
				{children}
			</Button>
		);
	}
);

DropdownTriggerButton.displayName = "DropdownTriggerButton";
