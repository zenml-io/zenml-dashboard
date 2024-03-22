import { Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "./AuthenticatedHeader";

export function AuthenticatedLayout() {
	return (
		<div className="relative flex min-h-screen w-full flex-col">
			<AuthenticatedHeader />
			<main className="flex flex-grow flex-col">
				<Outlet />
			</main>
		</div>
	);
}
