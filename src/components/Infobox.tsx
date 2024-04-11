import Info from "@/assets/icons/info.svg?react";
import { cn } from "@zenml-io/react-component-library";
import { ReactNode } from "react";

export default function InfoBox({
	children,
	className
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center rounded-md border border-primary-400 bg-primary-25 px-4 py-3",
				className
			)}
		>
			<Info className="mr-4 h-5 w-5 shrink-0 fill-theme-text-brand" />
			<div className="w-full min-w-0 text-text-sm">{children}</div>
		</div>
	);
}
