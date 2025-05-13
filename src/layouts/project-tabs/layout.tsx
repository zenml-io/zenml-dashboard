import { Outlet } from "react-router-dom";
import { ProjectHeader } from "./header";
export function ProjectTabsLayout() {
	return (
		<div>
			<ProjectHeader />
			<Outlet />
		</div>
	);
}
