import { useOnboarding } from "@/data/server/onboarding-state";
import { useServerInfo } from "@/data/server/info-query";
import { getOnboardingSetup } from "@/lib/onboarding";
import { Box, ProgressBar, RadialProgress, Skeleton } from "@zenml-io/react-component-library";
import { checkIsLocalServer } from "@/lib/server";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";
import Rocket from "@/assets/icons/rocket.svg?react";

export function FloatingProgressLink() {
	const onboarding = useOnboarding({
		refetchInterval: 60000
	});
	const serverInfo = useServerInfo();

	if (onboarding.isPending || serverInfo.isPending) {
		return (
			<div className="fixed bottom-3 right-3 z-50">
				<Skeleton className="h-9 w-9 shrink lg:h-[80px] lg:w-[300px]" />
			</div>
		);
	}
	if (onboarding.isError || serverInfo.isError) {
		return null;
	}
	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");
	const onboardingSetup = getOnboardingSetup(onboarding.data, isLocalServer);

	const title = "Get started";
	const completedItems = onboardingSetup.itemsDone;
	const totalItems = onboardingSetup.totalItems;
	const progress = onboardingSetup.progress;

	if (onboardingSetup.isFinished) return null;

	return (
		<Link className="fixed bottom-3 right-3 z-50 block" to={routes.onboarding}>
			<Box className="relative flex size-9 shrink-0 items-center justify-center lg:hidden">
				<RadialProgress value={progress}></RadialProgress>
				<div className="absolute inset-0 flex items-center justify-center text-text-xs">
					{completedItems}/{totalItems}
				</div>
			</Box>
			<Box className="hidden w-[300px] items-center gap-3 px-3 py-2 lg:flex">
				<Rocket width={24} height={24} className="shrink-0 fill-primary-400" />
				<div className="flex-1 space-y-1">
					<div className="text-text-md font-semibold">{title}</div>
					<div className="flex items-center gap-[10px]">
						<span className="text-text-xs">
							{completedItems}/{totalItems}
						</span>
						<ProgressBar className="h-1 w-full rounded-rounded" value={progress} />
					</div>
				</div>
			</Box>
		</Link>
	);
}
