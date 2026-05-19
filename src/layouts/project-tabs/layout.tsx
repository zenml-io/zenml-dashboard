import { Outlet } from "react-router-dom";
import { ProjectHeader } from "./header";
export function ProjectTabsLayout() {
	return (
		<div>
			<ProjectHeader />
			<div className="mx-auto w-full max-w-screen-xl p-5 lg:px-[80px]">
				<Outlet />
			</div>
		</div>
	);
}
