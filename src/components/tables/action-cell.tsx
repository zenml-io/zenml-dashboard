import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ActionCellProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

/**
 * Wrapper component for table action cells that aligns content to the right.
 * Used consistently across column definitions for action dropdowns.
 */
export function ActionCell({ children, className, ...props }: ActionCellProps) {
	return (
		<div className={clsx("flex items-center justify-end", className)} {...props}>
			{children}
		</div>
	);
}
