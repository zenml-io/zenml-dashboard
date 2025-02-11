import Container from "@/assets/icons/container.svg?react";
import { useEffect } from "react";
import { PageHeader } from "../../../components/PageHeader";
import { useBreadcrumbsContext } from "../../../layouts/AuthenticatedLayout/BreadcrumbsContext";

export function CreateComponentHeader() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "createComponent", data: null });
	}, []);
	return (
		<PageHeader>
			<div className="flex items-center gap-1">
				<Container className="h-5 w-5 fill-turquoise-400" />
				<h1 className="text-display-xs font-semibold">Register new Component</h1>
			</div>
		</PageHeader>
	);
}
