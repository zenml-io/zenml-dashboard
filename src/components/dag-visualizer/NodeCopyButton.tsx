import { HTMLAttributes, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { cn } from "@zenml-io/react-component-library/utilities";

export function CopyNodeButton({
	className,
	code,
	type,
	...rest
}: HTMLAttributes<HTMLDivElement> & { code: string; type: "artifact" | "step" }) {
	const [copied, setCopied] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	function copyToClipboard(code: string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(code);
			setCopied(true);
			setTooltipOpen(true);

			setTimeout(() => {
				setTooltipOpen(false);
				setCopied(false);
			}, 2000);
		}
	}
	return (
		<TooltipProvider>
			<Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
				<TooltipTrigger asChild>
					<div
						{...rest}
						className={cn(
							"hidden cursor-pointer items-center justify-center transition-all group-hover:flex",
							className
						)}
						onClick={(e) => {
							e.stopPropagation(); // Prevent the click event from bubbling up
							copyToClipboard(code);
						}}
					></div>
				</TooltipTrigger>
				<TooltipContent className="w-full max-w-md whitespace-normal transition-opacity">
					{copied ? "Copied!" : `Copy code to load ${type}`}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
