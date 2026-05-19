import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { FloatingProgressLink } from "@/components/onboarding/floating-progress-link";
export function NonProjectScopedLayout() {
	return (
		<div className="relative flex-1">
			<Header />
			<FloatingProgressLink />
			<div className="mx-auto w-full max-w-[1440px] px-5 lg:px-[80px]">
				<Outlet />
			</div>
		</div>
	);
}
