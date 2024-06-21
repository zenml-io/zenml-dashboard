import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { Tick } from "@/components/Tick";
import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getStarterSetupItems, getOnboardingProgress } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { OnboardingChecklistItemName } from "@/types/onboarding";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	RadialProgress,
	Skeleton
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { ConnectZenMLStep, RunFirstPipeline } from "./Items";

export function StarterSetupList() {
	const onboarding = useOnboarding({ refetchInterval: 5000 });
	const serverInfo = useServerInfo();
	const [open, setOpen] = useState(true);

	if (onboarding.isPending || serverInfo.isPending)
		return <Skeleton className="h-[200px] w-full" />;
	if (onboarding.isError || serverInfo.isError) return null;

	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");
	const STARTER_SETUP_ITEMS = getStarterSetupItems(isLocalServer);

	const { doneItems, progress } = getOnboardingProgress({
		itemList: STARTER_SETUP_ITEMS,
		onboardingState: onboarding.data,
		finalStep: "starter_setup_completed"
	});

	const order: OnboardingChecklistItemName[] = [
		...(STARTER_SETUP_ITEMS as OnboardingChecklistItemName[]),
		"starter_setup_completed"
	];

	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className={"rounded-md border border-theme-border-moderate bg-theme-surface-primary"}
		>
			<CollapsibleTrigger className="flex w-full items-center justify-between gap-[10px] p-3">
				<div className="flex items-center gap-3">
					{progress >= 100 ? (
						<Tick className="h-7 w-7" tickClasses="w-[28px] h-[28px]" />
					) : (
						<RadialProgress value={progress}>
							<span className="absolute text-text-xs font-semibold">
								{doneItems}/{STARTER_SETUP_ITEMS.length}
							</span>
						</RadialProgress>
					)}

					<div className="text-left">
						<p className="text-text-xl font-semibold">
							Starter Setup{" "}
							<span className="text-text-md font-medium text-theme-text-secondary">(2 min)</span>
						</p>
						<p className="text-theme-text-secondary">
							Follow these steps to make sure your client is connected and run your first MLOps
							pipeline with ZenML
						</p>
					</div>
				</div>
				<ChevronDown
					className={` ${
						open ? "" : "-rotate-90"
					} h-5 w-5 shrink-0 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="border-t border-theme-border-moderate p-5">
				<ul className="divide-y divide-theme-border-moderate">
					{!isLocalServer && (
						<li className="py-5 first:pt-0 last:pb-0">
							<ConnectZenMLStep order={order} onboardingState={onboarding.data} />
						</li>
					)}
					<li className="py-5 first:pt-0 last:pb-0">
						<RunFirstPipeline order={order} onboardingState={onboarding.data} />
					</li>
				</ul>
			</CollapsibleContent>
		</Collapsible>
	);
}
