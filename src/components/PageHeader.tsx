import { cn } from "@zenml-io/react-component-library";
import { HTMLAttributes, PropsWithChildren } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function PageHeader({ children, className, ...rest }: PropsWithChildren<Props>) {
	return (
		<div
			{...rest}
			className={cn(
				"border-b border-theme-border-moderate bg-theme-surface-primary px-5 py-3",
				className
			)}
		>
			{children}
		</div>
	);
}
