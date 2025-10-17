import { Outlet } from "react-router-dom";
import { ProjectHeader } from "./header";
export function ProjectTabsLayout() {
	return (
		<div className="overflow-y-auto">
			<ProjectHeader />
			<div className="p-5 lg:px-[80px]">
				<Outlet />
			</div>
		</div>
	);
}
