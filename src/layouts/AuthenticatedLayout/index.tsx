import { useCurrentUser } from "@/data/users/current-user-query";
import { SidebarProvider } from "@zenml-io/react-component-library";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Sidebar } from "./Sidebar";
import { routes } from "@/router/routes";
import { checkUserOnboarding } from "@/lib/user";
import { Analytics } from "@/components/Analytics";
import { ProductTour } from "@/components/tour/Tour";

export function AuthenticatedLayout() {
	const { data } = useCurrentUser();

	// if window is 1440px wide, set boolean to true
	const isMinWidth = window.innerWidth >= 1440;

	if (data && checkUserOnboarding(data)) {
		return (
			<Navigate
				to={
					routes.survey +
					`?${new URLSearchParams({ redirect: location.pathname + location.search }).toString()}`
				}
			/>
		);
	}

	return (
		<div className="relative flex min-h-screen w-full flex-col">
			<AuthenticatedHeader />
			<main className="flex flex-grow flex-col">
				<div className="flex flex-grow">
					<SidebarProvider initialOpen={isMinWidth}>
						<Sidebar />
					</SidebarProvider>
					<div className="w-full">
						<Analytics />
						<ProductTour />
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
