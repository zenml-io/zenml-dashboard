import { cn } from "@zenml-io/react-component-library";
import { InputHTMLAttributes, forwardRef } from "react";

type ProviderRadioProps = InputHTMLAttributes<HTMLInputElement>;
export const PrimaryUseRadioButton = forwardRef<HTMLInputElement, ProviderRadioProps>(
	({ children, className, id, ...rest }, ref) => (
		<div className="min-h-[160px] min-w-[160px]">
			<input id={id} {...rest} ref={ref} className={cn("peer sr-only", className)} type="radio" />
			<label
				htmlFor={id}
				className="flex h-full w-full flex-col items-center justify-center space-y-5 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-5 text-text-lg text-theme-text-secondary transition-all duration-150 hover:cursor-pointer hover:border-theme-border-bold hover:shadow-sm peer-checked:border-primary-400 peer-checked:bg-primary-25 peer-checked:shadow-sm peer-focus-visible:border-primary-100"
			>
				{children}
			</label>
		</div>
	)
);

PrimaryUseRadioButton.displayName = "UseRadioButton";
