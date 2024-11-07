import Copy from "@/assets/icons/copy.svg?react";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";

export function CopyNodeButton({ code, type }: { code: string; type: string }) {
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
					<div className="relative flex items-center">
						<div
							className="hidden cursor-pointer transition-all group-hover:flex"
							onClick={(e) => {
								e.stopPropagation(); // Prevent the click event from bubbling up
								copyToClipboard(code);
							}}
						>
							<Copy
								className={`${
									type === "step" ? "fill-theme-text-tertiary" : "fill-primary-400"
								} h-5 `}
							/>
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent className="w-full max-w-md whitespace-normal transition-opacity">
					{copied ? "Copied!" : `Copy code to load ${type}`}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
