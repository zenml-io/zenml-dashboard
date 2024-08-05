import { cn } from "@zenml-io/react-component-library/utilities";
import { forwardRef, HTMLProps, InputHTMLAttributes } from "react";

export const RadioItemLabel = forwardRef<HTMLLabelElement, HTMLProps<HTMLLabelElement>>(
	({ className, ...rest }, ref) => {
		return (
			<label
				ref={ref}
				{...rest}
				className={cn(
					"flex w-full items-center gap-2 space-x-2 rounded-md border border-theme-border-moderate p-4 font-semibold transition-shadow duration-150 hover:cursor-pointer hover:shadow-sm data-[state=selected]:border-theme-surface-strong",
					className
				)}
			/>
		);
	}
);

RadioItemLabel.displayName = "RadioItemLabel";

export const RadioItem = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
	({ className, type, ...rest }, ref) => {
		return (
			<input
				type="radio"
				ref={ref}
				{...rest}
				className={cn(
					"h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong",
					className
				)}
			/>
		);
	}
);

RadioItem.displayName = "RadioItem";
