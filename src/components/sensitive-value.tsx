"use client";
import EyeOff from "@/assets/icons/eye-off.svg?react";
import Eye from "@/assets/icons/eye.svg?react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { useCopy } from "@/lib/copy";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useRef, useState } from "react";

type Props = {
	value: string;
};

const iconClasses = "fill-neutral-500 shrink-0";

const MAX_DOT_LENGTH: number = 10;

export function SensitiveValue({ value }: Props) {
	const [showValue, setShowValue] = useState(false);

	return (
		<div className="flex min-w-0 items-center gap-0.5 whitespace-normal">
			<Button
				intent="secondary"
				emphasis="minimal"
				onClick={() => setShowValue((prev) => !prev)}
				className="flex aspect-square size-6 items-center justify-center"
			>
				{showValue ? (
					<>
						<span className="sr-only">Hide value</span>
						<EyeOff width={24} height={24} className={iconClasses} />
					</>
				) : (
					<>
						<span className="sr-only">Show value</span>
						<Eye width={24} height={24} className={iconClasses} />
					</>
				)}
			</Button>

			{showValue ? (
				<ValueButton value={value} />
			) : (
				<p className="min-w-0">{"•".repeat(Math.min(value.length, MAX_DOT_LENGTH))}</p>
			)}
		</div>
	);
}

type ValueButtonProps = {
	value: string;
};
function ValueButton({ value }: ValueButtonProps) {
	const { copied, copyToClipboard } = useCopy();
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger
					onClick={(e) => {
						e.preventDefault();
						copyToClipboard(value);
					}}
					asChild
				>
					<Button
						intent="secondary"
						className="block min-w-0 max-w-full truncate text-text-md font-medium"
						emphasis="minimal"
						ref={triggerRef}
					>
						{value}
					</Button>
				</TooltipTrigger>
				<TooltipContent
					onPointerDownOutside={(event) => {
						if (event.currentTarget === triggerRef.current) event.preventDefault();
					}}
					className="z-50 rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg"
					sideOffset={5}
				>
					{copied ? "Copied!" : "Copy to Clipboard"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
