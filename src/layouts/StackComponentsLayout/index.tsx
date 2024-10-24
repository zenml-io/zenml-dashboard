import { Outlet } from "react-router-dom";
import { StackSectionHeader } from "./Header";
import { StackComponentTabs } from "./Tabs";

export function StackComponentsLayout() {
	return (
		<div>
			<StackSectionHeader />
			<section className="p-5">
				<StackComponentTabs>
					<Outlet />
				</StackComponentTabs>
			</section>
		</div>
	);
}
