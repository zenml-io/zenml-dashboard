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

/** Fixed mask length — never mirrors the real secret length (avoids layout overflow). */
const FIXED_MASK_LENGTH = 12;

export function SensitiveValue({ value }: Props) {
	const [showValue, setShowValue] = useState(false);

	return (
		<div className="flex w-full min-w-0 items-center gap-0.5">
			<Button
				intent="secondary"
				emphasis="minimal"
				onClick={() => setShowValue((prev) => !prev)}
				className="flex aspect-square size-6 shrink-0 items-center justify-center"
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
				<div className="min-w-0 flex-1 overflow-hidden">
					<ValueButton value={value} />
				</div>
			) : (
				<p className="min-w-0 flex-1 truncate">{"•".repeat(FIXED_MASK_LENGTH)}</p>
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
					{/* Native button: library Button is `display:flex`, which breaks text-overflow. */}
					<button
						type="button"
						ref={triggerRef}
						className="w-fit min-w-0 max-w-full truncate rounded-md px-1 py-0.5 text-left text-text-md font-medium text-theme-text-primary hover:bg-neutral-200 active:bg-neutral-300"
					>
						{value}
					</button>
				</TooltipTrigger>
				<TooltipContent
					onPointerDownOutside={(event) => {
						if (event.currentTarget === triggerRef.current) event.preventDefault();
					}}
					className="z-50 rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg"
					sideOffset={5}
				>
					{copied ? "Copied!" : "Click to copy"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
