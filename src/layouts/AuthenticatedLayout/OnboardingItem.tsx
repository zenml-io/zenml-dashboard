import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getProductionSetupItems, getProgress, getStarterSetupItems } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { routes } from "@/router/routes";
import { Box, ProgressBar, Skeleton, useSidebarContext } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function OnboardingItem() {
	const onboarding = useOnboarding({ refetchInterval: 3600 * 1000 });
	const serverInfo = useServerInfo();
	const { isOpen } = useSidebarContext();
	if (onboarding.isError || serverInfo.isError) return null;
	if (onboarding.isPending || serverInfo.isPending) {
		return (
			<Box className="w-full rounded-md p-2">
				<Skeleton className="h-5" />
			</Box>
		);
	}

	const STARTER_SETUP_ITEMS = getStarterSetupItems(
		checkIsLocalServer(serverInfo.data.deployment_type || "other")
	);

	const PRODUCTION_SETUP_ITEMS = getProductionSetupItems();

	const isStarterSetupFinished =
		getProgress(onboarding.data, STARTER_SETUP_ITEMS, "starter_setup_completed") ===
		STARTER_SETUP_ITEMS.length;

	const isProductionSetupFinished =
		getProgress(onboarding.data, PRODUCTION_SETUP_ITEMS, "production_setup_completed") ===
		PRODUCTION_SETUP_ITEMS.length;

	const doneItems = getProgress(
		onboarding.data,
		isStarterSetupFinished ? PRODUCTION_SETUP_ITEMS : STARTER_SETUP_ITEMS,
		isStarterSetupFinished ? "production_setup_completed" : "starter_setup_completed"
	);

	const activeFlow = {
		title: isStarterSetupFinished ? "Production Setup" : "Starter Setup",
		doneItems,
		total: isStarterSetupFinished ? PRODUCTION_SETUP_ITEMS.length : STARTER_SETUP_ITEMS.length
	};

	if (isProductionSetupFinished && isStarterSetupFinished) {
		return null;
	}
	const progress = (activeFlow.doneItems / activeFlow.total) * 100;

	return (
		<li className="w-full">
			<Link to={routes.onboarding}>
				<Box className="w-full gap-2 rounded-md p-2">
					<div
						className={`m-0 flex h-0 items-center justify-between truncate  transition-all duration-300 ${isOpen ? "mb-2 h-5" : "opacity-0 group-hover:mb-2 group-hover:h-5 group-hover:opacity-100"} `}
					>
						{activeFlow.title}
						<ChevronRight className="h-4 w-4 fill-theme-text-primary" />
					</div>
					<div className="flex items-center gap-[10px]">
						<span className="text-text-sm">
							{activeFlow.doneItems}/{activeFlow.total}
						</span>
						<ProgressBar className="h-1 rounded-rounded" value={progress} />
					</div>
				</Box>
			</Link>
		</li>
	);
}
