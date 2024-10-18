import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getOnboardingSetup } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { Badge, Skeleton } from "@zenml-io/react-component-library";

export function ProgressIndicatior() {
	const onboarding = useOnboarding();
	const serverInfo = useServerInfo();

	if (onboarding.isPending || serverInfo.isPending)
		return <Skeleton className="h-[32px] w-[150px]" />;
	if (onboarding.isError || serverInfo.isError) {
		return null;
	}
	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");
	const onboardingSetup = getOnboardingSetup(onboarding.data, isLocalServer);
	const completedItems = onboardingSetup.itemsDone;
	const totalItems = onboardingSetup.totalItems;

	return (
		<Badge rounded={false} color="light-purple" className="text-text-sm font-semibold">
			{completedItems}/{totalItems} steps completed
		</Badge>
	);
}
