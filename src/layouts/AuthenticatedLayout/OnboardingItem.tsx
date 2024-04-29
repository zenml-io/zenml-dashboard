import { Icon } from "@/components/Icon";
import { useServerSettings } from "@/data/server/get-server-settings";
import { PRODUCTION_SETUP_ITEMS, STARTER_SETUP_ITEMS } from "@/lib/constants";
import { getOnboardingState, getProgress } from "@/lib/onboarding";
import { routes } from "@/router/routes";
import { Box, ProgressBar, Skeleton, useSidebarContext } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function OnboardingItem() {
	const { isPending, isError, data } = useServerSettings({ throwOnError: true });
	const { isOpen } = useSidebarContext();
	if (isError) return null;
	if (isPending) {
		return (
			<Box className="w-full rounded-md p-2">
				<Skeleton className="h-5" />
			</Box>
		);
	}
	const onboardingState = getOnboardingState(data || {});
	const isStarterSetupFinished =
		getProgress(onboardingState, STARTER_SETUP_ITEMS) === STARTER_SETUP_ITEMS.length;

	const isProductionSetupFinished =
		getProgress(onboardingState, PRODUCTION_SETUP_ITEMS) === PRODUCTION_SETUP_ITEMS.length;

	const doneItems = getProgress(
		onboardingState,
		isStarterSetupFinished ? PRODUCTION_SETUP_ITEMS : STARTER_SETUP_ITEMS
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
						<Icon name="chevron-right" className="h-4 w-4 fill-theme-text-primary" />
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
