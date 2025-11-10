import { Analytics } from "@/components/Analytics";
import { AnnouncementHighlight } from "@/components/announcements/announcement-highlight";
import { useServerSettings } from "@/data/server/get-server-settings";
import { useCurrentUser } from "@/data/users/current-user-query";
import { checkUserOnboarding } from "@/lib/user";
import { routes } from "@/router/routes";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { BreadcrumbContextProvider } from "./BreadcrumbsContext";
import { LocalBanner } from "./LocalBanner";

export function AuthenticatedLayout() {
	const { data } = useCurrentUser();
	const serverSettings = useServerSettings();

	if (data && checkUserOnboarding(data)) {
		return (
			<Navigate
				to={routes.survey + `?${new URLSearchParams({ redirect: routes.onboarding }).toString()}`}
			/>
		);
	}

	const displayUpdates = serverSettings.data?.body?.display_updates ?? false;

	return (
		<div className="relative flex h-dvh flex-col overflow-hidden">
			<BreadcrumbContextProvider>
				<div className="sticky top-0 z-10">
					<LocalBanner />
					<AuthenticatedHeader />
				</div>
				<main className="flex flex-1 flex-col overflow-x-hidden">
					<Analytics />
					{displayUpdates && <AnnouncementHighlight />}
					<Outlet />
				</main>
			</BreadcrumbContextProvider>
		</div>
	);
}
