import { PropsWithChildren } from "react";

export function PageHeader({ children }: PropsWithChildren) {
	return (
		<div className="border-b border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
			{children}
		</div>
	);
}
