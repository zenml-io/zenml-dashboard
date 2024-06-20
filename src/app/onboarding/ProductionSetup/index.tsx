import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { Tick } from "@/components/Tick";
import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getProductionSetupItems, getProgress, getStarterSetupItems } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { OnboardingChecklistItemName } from "@/types/onboarding";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	RadialProgress,
	Skeleton,
	cn
} from "@zenml-io/react-component-library";
import { useState } from "react";
import {
	CreateArtifactStore,
	CreateNewStack,
	CreateServiceConnector,
	RunNewPipeline
} from "./Items";

export function ProductionSetupChecklist() {
	const onboarding = useOnboarding({ refetchInterval: 5000 });
	const serverInfo = useServerInfo();
	const [open, setOpen] = useState(true);

	if (onboarding.isPending || serverInfo.isPending)
		return <Skeleton className="h-[200px] w-full" />;
	if (onboarding.isError || serverInfo.isError) return null;

	const { items: STARTER_SETUP_ITEMS } = getStarterSetupItems(
		checkIsLocalServer(serverInfo.data.deployment_type || "other")
	);

	const { items: PRODUCTION_SETUP_ITEMS } = getProductionSetupItems();

	const isStarterSetupFinished =
		getProgress(onboarding.data, STARTER_SETUP_ITEMS as OnboardingChecklistItemName[]) ===
		STARTER_SETUP_ITEMS.length;
	const doneItems = getProgress(onboarding.data, PRODUCTION_SETUP_ITEMS);
	const progress = (doneItems / PRODUCTION_SETUP_ITEMS.length) * 100;

	return (
		<>
			<Collapsible
				onOpenChange={setOpen}
				open={open}
				className={cn("rounded-md border border-theme-border-moderate bg-theme-surface-primary")}
			>
				<CollapsibleTrigger className="flex w-full items-center justify-between gap-[10px] p-3">
					<div className="flex items-center gap-3">
						{progress >= 100 ? (
							<Tick className="h-7 w-7" tickClasses="w-[28px] h-[28px]" />
						) : (
							<RadialProgress value={progress}>
								<span className="absolute text-text-xs font-semibold">
									{doneItems}/{PRODUCTION_SETUP_ITEMS.length}
								</span>
							</RadialProgress>
						)}

						<div className="text-left">
							<p className="text-text-md font-semibold">
								Production Setup{" "}
								<span className="text-text-md font-medium text-theme-text-secondary">(10 min)</span>
							</p>
							<p className="text-theme-text-secondary">
								{isStarterSetupFinished ? (
									"Level up your skills in a production setting."
								) : (
									<span className="text-primary-400">
										Complete the Starter Setup to enable the production setup.
									</span>
								)}
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
						<li className="py-5 first:pt-0 last:pb-0">
							<CreateServiceConnector
								onboardingState={onboarding.data}
								active={isStarterSetupFinished}
							/>
						</li>
						<li className="py-5 first:pt-0 last:pb-0">
							<CreateArtifactStore
								onboardingState={onboarding.data}
								active={isStarterSetupFinished}
							/>
						</li>
						<li className="py-5 first:pt-0 last:pb-0">
							<CreateNewStack onboardingState={onboarding.data} active={isStarterSetupFinished} />
						</li>
						<li className="py-5 first:pt-0 last:pb-0">
							<RunNewPipeline onboardingState={onboarding.data} active={isStarterSetupFinished} />
						</li>
					</ul>
				</CollapsibleContent>
			</Collapsible>
		</>
	);
}
