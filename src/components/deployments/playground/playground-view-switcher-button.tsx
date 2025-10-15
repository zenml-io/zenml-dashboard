import { cn } from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const PlaygroundViewSwitcherButton = forwardRef<
	ElementRef<typeof Button>,
	ComponentPropsWithoutRef<typeof Button>
>(({ className, ...rest }, ref) => {
	return (
		<Button
			{...rest}
			ref={ref}
			intent="secondary"
			emphasis="subtle"
			className={cn(
				"group flex items-center justify-center rounded-sharp border-none data-[state=active]:bg-primary-50",
				className
			)}
		>
			{rest.children}
		</Button>
	);
});

PlaygroundViewSwitcherButton.displayName = "PlaygroundViewSwitcherButton";
