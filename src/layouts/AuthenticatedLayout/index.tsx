import { Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@zenml-io/react-component-library";

export function AuthenticatedLayout() {
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
