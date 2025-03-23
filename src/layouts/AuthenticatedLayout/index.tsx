import { Analytics } from "@/components/Analytics";
import { SidebarProvider } from "@zenml-io/react-component-library";
import { Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { BreadcrumbsContextProvider } from "./BreadcrumbsContext";
import { LocalBanner } from "./LocalBanner";
import { Sidebar } from "./Sidebar";

export function AuthenticatedLayout() {
	// if window is 1440px wide, set boolean to true
	const isMinWidth = window.innerWidth >= 1440;

	return (
		<div className="relative flex min-h-screen w-full flex-col">
			<BreadcrumbsContextProvider currentBreadcrumbData={null} setCurrentBreadcrumbData={null}>
				<div className="sticky top-0 z-10">
					<LocalBanner />
					<AuthenticatedHeader />
				</div>
				<main className="flex flex-grow flex-col">
					<div className="flex flex-grow">
						<SidebarProvider initialOpen={isMinWidth}>
							<Sidebar />
						</SidebarProvider>
						<div className="w-full overflow-y-hidden">
							<Analytics />

							<Outlet />
						</div>
					</div>
				</main>
			</BreadcrumbsContextProvider>
		</div>
	);
}
