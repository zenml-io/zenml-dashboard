import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getProductionSetup, getStarterSetup } from "@/lib/onboarding";
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

	const starterSetup = getStarterSetup(
		onboarding.data,
		checkIsLocalServer(serverInfo.data.deployment_type || "other")
	);
	const productionSetup = getProductionSetup(onboarding.data);

	const title = starterSetup.isFinished ? "Production Setup" : "Starter Setup";
	const completedItems = starterSetup.isFinished
		? productionSetup.itemsDone
		: starterSetup.itemsDone;
	const totalItems = starterSetup.isFinished ? productionSetup.totalItems : starterSetup.totalItems;
	const progress = starterSetup.isFinished ? productionSetup.progress : starterSetup.progress;

	if (starterSetup.isFinished && productionSetup.isFinished) return null;

	return (
		<li className="w-full">
			<Link to={routes.onboarding}>
				<Box className="w-full gap-2 rounded-md p-2">
					<div
						className={`m-0 flex h-0 items-center justify-between truncate  transition-all duration-300 ${isOpen ? "mb-2 h-5" : "opacity-0 group-hover:mb-2 group-hover:h-5 group-hover:opacity-100"} `}
					>
						{title}
						<ChevronRight className="h-4 w-4 fill-theme-text-primary" />
					</div>
					<div className="flex items-center gap-[10px]">
						<span className="text-text-sm">
							{completedItems}/{totalItems}
						</span>
						<ProgressBar className="h-1 rounded-rounded" value={progress} />
					</div>
				</Box>
			</Link>
		</li>
	);
}
