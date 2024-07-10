export function SelectCloudProvider() {}

import { cn } from "@zenml-io/react-component-library";
import { InputHTMLAttributes, forwardRef } from "react";

type ProviderRadioProps = InputHTMLAttributes<HTMLInputElement>;
const CloudProviderRadioButton = forwardRef<HTMLInputElement, ProviderRadioProps>(
	({ children, className, id, ...rest }, ref) => (
		<div className="min-h-[160px] min-w-[160px]">
			<input id={id} {...rest} ref={ref} className={cn("peer sr-only", className)} type="radio" />
			<label
				htmlFor={id}
				className="flex h-full w-full flex-col items-center justify-center space-y-5 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-5 text-text-lg text-theme-text-secondary hover:cursor-pointer peer-checked:border-primary-100 peer-checked:bg-primary-25 peer-focus-visible:border-primary-100"
			>
				{children}
			</label>
		</div>
	)
);

CloudProviderRadioButton.displayName = "CloudProviderRadioButton";
