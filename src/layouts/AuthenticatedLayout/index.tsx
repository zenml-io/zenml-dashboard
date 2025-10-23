import { Analytics } from "@/components/Analytics";
import { useCurrentUser } from "@/data/users/current-user-query";
import { checkUserOnboarding } from "@/lib/user";
import { routes } from "@/router/routes";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { BreadcrumbContextProvider } from "./BreadcrumbsContext";
import { LocalBanner } from "./LocalBanner";

export function AuthenticatedLayout() {
	const { data } = useCurrentUser();

	if (data && checkUserOnboarding(data)) {
		return (
			<Navigate
				to={routes.survey + `?${new URLSearchParams({ redirect: routes.onboarding }).toString()}`}
			/>
		);
	}

	return (
		<div className="relative flex h-dvh flex-col overflow-hidden">
			<BreadcrumbContextProvider>
				<div className="sticky top-0 z-10">
					<LocalBanner />
					<AuthenticatedHeader />
				</div>
				<main className="flex flex-1 flex-col overflow-x-hidden">
					<Analytics />
					<Outlet />
				</main>
			</BreadcrumbContextProvider>
		</div>
	);
}
