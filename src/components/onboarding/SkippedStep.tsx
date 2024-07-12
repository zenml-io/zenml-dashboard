import { cn } from "@zenml-io/react-component-library";
import { HTMLAttributes } from "react";
import Forward from "@/assets/icons/chevron-right-double.svg?react";

export function SkippedStep({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-rounded border-2 border-warning-300 bg-warning-50",
				className
			)}
			{...rest}
		>
			<Forward className="h-3 w-3 fill-warning-300" />
		</div>
	);
}
