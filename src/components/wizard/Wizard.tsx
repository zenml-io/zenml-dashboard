import { Box } from "@zenml-io/react-component-library";
import { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
	return <Box className="w-full">{children}</Box>;
}

export function Header({ children }: { children: ReactNode }) {
	return (
		<div className="border-b border-theme-border-moderate px-5 py-3 text-display-xs font-semibold">
			{children}
		</div>
	);
}

export function Body({ children }: { children: ReactNode }) {
	return <div className="p-5">{children}</div>;
}

export function Footer({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center justify-end gap-2 border-t border-theme-border-moderate p-5">
			{children}
		</div>
	);
}
