import Container from "@/assets/icons/container.svg?react";
import { PageHeader } from "../../../components/PageHeader";
import { useComponentCreateBreadcrumbs } from "./breadcrumb";

export function CreateComponentHeader() {
	useComponentCreateBreadcrumbs();

	return (
		<PageHeader>
			<div className="flex items-center gap-1">
				<Container className="h-5 w-5 fill-turquoise-400" />
				<h1 className="text-display-xs font-semibold">Register new Component</h1>
			</div>
		</PageHeader>
	);
}
