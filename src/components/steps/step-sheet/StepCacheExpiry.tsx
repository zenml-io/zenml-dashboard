import ExpireIcon from "@/assets/icons/trash.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { Step } from "@/types/steps";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useExpireCache } from "./use-expire-cache";

type StepCacheExpiryProps = {
	step: Step;
};

export function StepCacheExpiry({ step }: StepCacheExpiryProps) {
	const isExpired = step.metadata?.cache_expires_at
		? new Date(step.metadata.cache_expires_at) < new Date()
		: false;

	return (
		<div className="group/copybutton flex items-center gap-0.5">
			{step.metadata?.cache_expires_at ? (
				<DisplayDate dateString={step.metadata.cache_expires_at} />
			) : (
				"Never"
			)}
			{step.metadata?.cache_expires_at !== undefined &&
				(isExpired ? (
					<span className="text-text-sm text-theme-text-warning">(Expired)</span>
				) : (
					<ExpireStepCacheButton step={step} />
				))}
		</div>
	);
}

type ExpireStepCacheButtonProps = {
	step: Step;
};

function ExpireStepCacheButton({ step }: ExpireStepCacheButtonProps) {
	const { handleExpireNow, isPending } = useExpireCache(step.id);

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild>
					<Button
						className="opacity-0 transition-all duration-200 group-hover/copybutton:opacity-100"
						size="sm"
						intent="secondary"
						emphasis="minimal"
						onClick={() => handleExpireNow()}
						disabled={isPending}
					>
						<span className="sr-only">Expiry Date</span>
						<ExpireIcon className="pointer-events-none h-3 w-3 fill-theme-text-tertiary" />
					</Button>
				</TooltipTrigger>
				<TooltipContent
					className="z-50 rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg"
					sideOffset={5}
				>
					{isPending ? "Invalidating cache..." : "Invalidate cache"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
