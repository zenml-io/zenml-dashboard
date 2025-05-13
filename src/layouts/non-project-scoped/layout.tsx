import { Outlet } from "react-router-dom";
import { Header } from "./header";
export function NonProjectScopedLayout() {
	return (
		<div className="relative flex-1">
			<Header />
			{/* <FloatingProgressLink workspaceId={workspaceId} /> */}
			<div className="px-5 lg:px-[80px]">
				<Outlet />
			</div>
		</div>
	);
}
