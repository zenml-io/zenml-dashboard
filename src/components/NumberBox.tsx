import { PropsWithChildren } from "react";

export function Numberbox({ children }: PropsWithChildren) {
	return (
		<div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary-100 text-text-lg font-semibold text-theme-text-brand">
			{children}
		</div>
	);
}
