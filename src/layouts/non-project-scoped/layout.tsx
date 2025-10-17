import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { FloatingProgressLink } from "@/components/onboarding/floating-progress-link";
export function NonProjectScopedLayout() {
	return (
		<div className="relative overflow-y-auto">
			<Header />
			<FloatingProgressLink />
			<div className="px-5 lg:px-[80px]">
				<Outlet />
			</div>
		</div>
	);
}
