import Rocket from "@/assets/icons/rocket.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getOnboardingSetup } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { Box, Skeleton, ProgressBar } from "@zenml-io/react-component-library";

export function ProgressIndicatior() {
	const onboarding = useOnboarding();
	const serverInfo = useServerInfo();

	if (onboarding.isPending || serverInfo.isPending) return <Skeleton className="h-[80px] w-full" />;
	if (onboarding.isError || serverInfo.isError) {
		return null;
	}

	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");
	const onboardingSetup = getOnboardingSetup(onboarding.data, isLocalServer);
	const completedItems = onboardingSetup.itemsDone;
	const totalItems = onboardingSetup.totalItems;
	const progress = onboardingSetup.progress;

	return (
		<Box className="flex w-full max-w-full items-center gap-3 px-3 py-2">
			<Rocket width={24} height={24} className="shrink-0 fill-primary-400" />
			<div className="flex-1 space-y-1">
				<div className="text-text-xl font-semibold">Get started</div>
				<div className="flex items-center gap-[10px]">
					<span className="text-text-sm">
						{completedItems}/{totalItems}
					</span>
					<ProgressBar className="h-1 w-full rounded-rounded" value={progress} />
				</div>
			</div>
		</Box>
	);
}
