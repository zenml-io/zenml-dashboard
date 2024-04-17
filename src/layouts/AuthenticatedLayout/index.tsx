import { Navigate, Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@zenml-io/react-component-library";
import { useCurrentUser } from "@/data/users/current-user-query";
import { routes } from "@/router/routes";

export function AuthenticatedLayout() {
	const { data } = useCurrentUser();

	if (data && !data.metadata?.email) {
		return <Navigate to={routes.survey} />;
	}

	return (
		<div className="relative flex min-h-screen w-full flex-col">
			<AuthenticatedHeader />
			<main className="flex flex-grow flex-col">
				<div className="flex flex-grow">
					<SidebarProvider>
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
