import { useCurrentUser } from "@/data/users/current-user-query";
import { SidebarProvider } from "@zenml-io/react-component-library";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Sidebar } from "./Sidebar";
import { routes } from "@/router/routes";
import { UserMetadata } from "@/types/user";

export function AuthenticatedLayout() {
	const { data } = useCurrentUser();

	// if window is 1440px wide, set boolean to true
	const isMinWidth = window.innerWidth >= 1440;

	if (data && !(data.metadata?.metadata as UserMetadata)?.awareness_channels) {
		return <Navigate to={routes.survey} />;
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
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
