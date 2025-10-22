import SlashCircle from "@/assets/icons/slash-circle.svg?react";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { cn } from "@zenml-io/react-component-library";

export function BooleanValue({ value, className }: { value: boolean; className?: string }) {
	return (
		<div>
			{value === true ? (
				<CheckCircle className={cn("h-4 w-4 shrink-0 fill-theme-text-success", className)} />
			) : (
				<SlashCircle className={cn("h-4 w-4 shrink-0 fill-theme-text-tertiary", className)} />
			)}

			<span className="sr-only">{value ? "True" : "False"}</span>
		</div>
	);
}
