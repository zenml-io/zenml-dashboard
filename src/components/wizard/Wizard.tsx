import { Box, cn } from "@zenml-io/react-component-library";
import { HTMLAttributes, ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
	return <Box className="w-full">{children}</Box>;
}

type Props = HTMLAttributes<HTMLDivElement>;

export function Header({ children, className, ...rest }: Props) {
	return (
		<div
			className={cn(
				"border-b border-theme-border-moderate px-5 py-3 text-display-xs font-semibold",
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Body({ children, className, ...rest }: Props) {
	return (
		<div {...rest} className={cn("p-5", className)}>
			{children}
		</div>
	);
}

export function Footer({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center justify-end gap-2 border-t border-theme-border-moderate p-5">
			{children}
		</div>
	);
}
