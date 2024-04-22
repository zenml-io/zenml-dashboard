import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	RadialProgress,
	Skeleton
} from "@zenml-io/react-component-library";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { useState } from "react";
import { useServerSettings } from "@/data/server/get-server-settings";

export function StarterSetupList() {
	const { isError, isPending, data } = useServerSettings({ throwOnError: true });
	const [open, setOpen] = useState(false);

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	// const doneItems = data.body?.onboarding_state?.starterSetup as OnboardingChecklistItem[];

	const progress = (((data.body?.onboarding_state?.starterSetup as any[])?.length ?? 0) / 3) * 100;

	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className={"rounded-md border border-theme-border-moderate bg-theme-surface-primary"}
		>
			<CollapsibleTrigger className="flex w-full items-center justify-between gap-[10px] p-3">
				<div className="flex items-center gap-3">
					<RadialProgress value={progress} />

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
			<CollapsibleContent className="border-t border-theme-border-moderate p-5"></CollapsibleContent>
		</Collapsible>
	);
}
