import { Outlet } from "react-router-dom";
import { RunsDetailHeader } from "./Header";

export function RunDetailLayout() {
	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden">
			<RunsDetailHeader />
			<Outlet />
		</div>
	);
}
