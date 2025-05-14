import { Analytics } from "@/components/Analytics";
import { useCurrentUser } from "@/data/users/current-user-query";
import { checkUserOnboarding } from "@/lib/user";
import { routes } from "@/router/routes";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { BreadcrumbsContextProvider } from "./BreadcrumbsContext";
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
		<div className="relative flex min-h-screen w-full flex-col">
			<BreadcrumbsContextProvider currentBreadcrumbData={null} setCurrentBreadcrumbData={null}>
				<div className="sticky top-0 z-10">
					<LocalBanner />
					<AuthenticatedHeader />
				</div>
				<main className="flex flex-grow flex-col">
					<div className="flex flex-grow">
						<div className="w-full overflow-y-hidden">
							<Analytics />
							{/* <ProductTour /> */}
							<Outlet />
						</div>
					</div>
				</main>
			</BreadcrumbsContextProvider>
		</div>
	);
}
