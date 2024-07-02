import { PageHeader } from "@/components/PageHeader";
import Stack from "@/assets/icons/stack.svg?react";
import { Outlet } from "react-router-dom";

export function CreateStacksLayout() {
	return (
		<div>
			<PageHeader>
				<div className="flex items-center gap-1">
					<Stack className="h-5 w-5 fill-turquoise-400" />
					<h1 className="text-display-xs  font-semibold">Register a Stack</h1>
				</div>
			</PageHeader>
			<Outlet />
		</div>
	);
}
