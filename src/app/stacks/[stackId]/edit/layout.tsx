import { Outlet } from "react-router-dom";
import { StackHeader } from "./stack-header";

export default function EditStacksLayout() {
	return (
		<div className="flex h-full flex-col">
			<StackHeader />
			<Outlet />
		</div>
	);
}
