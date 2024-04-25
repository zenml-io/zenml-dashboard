import { Analytics } from "@/components/Analytics";
import { Outlet } from "react-router-dom";

export function RootLayout() {
	return (
		<div className="bg-theme-surface-secondary font-sans font-medium text-theme-text-primary antialiased">
			<Outlet />
			<Analytics />
		</div>
	);
}
