import Stack from "@/assets/icons/stack.svg?react";
import { PageHeader } from "@/components/PageHeader";
import { Outlet } from "react-router-dom";

export default function EditStacksLayout() {
	// useStackCreateBreadcrumbs();
	return (
		<div className="flex h-full flex-col">
			<PageHeader>
				<div className="flex items-center gap-1">
					<Stack className="h-5 w-5 fill-turquoise-400" />
					<h1 className="text-display-xs font-semibold">Update Stack</h1>
				</div>
			</PageHeader>
			<Outlet />
		</div>
	);
}
