import { useRef, useState } from "react";
import {
	TooltipProvider,
	TooltipTrigger,
	Tooltip,
	TooltipContent
} from "@zenml-io/react-component-library";
import { Icon } from "./Icon";

type Props = {
	copyText: string;
	isVisible?: boolean;
	copyTitle?: string;
};

export function CopyButton({ copyText, isVisible, copyTitle }: Props) {
	const triggerRef = useRef<HTMLButtonElement>(null);
	const [copied, setCopied] = useState(false);
	const copiedTitle = isVisible ? copyTitle : "Copy to Clipboard";
	const copy = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(copyText);
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	};

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger
					className={`${
						isVisible ? "" : "invisible  opacity-0 group-hover/copybutton:opacity-100"
					}  h-4 w-4 rounded-sm  p-0.25 transition-all
					duration-200 hover:bg-theme-surface-primary active:bg-neutral-300 group-hover/copybutton:visible `}
					onClick={(e) => {
						e.preventDefault();
						copy();
					}}
					ref={triggerRef}
				>
					<span className="sr-only">Copy to Clipboard</span>
					<Icon
						name="copy"
						className={`${
							isVisible ? "h-5 w-5" : "h-3 w-3"
						} pointer-events-none  fill-theme-text-tertiary`}
					/>
				</TooltipTrigger>
				<TooltipContent
					onPointerDownOutside={(event) => {
						if (event.currentTarget === triggerRef.current) event.preventDefault();
					}}
					className="z-50 rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg"
					sideOffset={5}
				>
					{copied ? "Copied!" : copiedTitle}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
