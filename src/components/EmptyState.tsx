import { cn } from "@zenml-io/react-component-library";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
	icon?: ReactNode;
	className?: string;
};

export function EmptyState({ children, icon, className }: PropsWithChildren<Props>) {
	return (
		<section
			className={cn(
				"layout-container flex h-full w-full flex-1 flex-col items-center justify-center gap-5",
				className
			)}
		>
			{icon}
			{children}
		</section>
	);
}
