import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { useBreadcrumbsContext } from "../AuthenticatedLayout/BreadcrumbsContext";

export function StackSectionHeader() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	const path = useLocation().pathname;
	const segment = path.split("/").at(-1) as "stacks" | "components" | null;

	useEffect(() => {
		if (segment === "stacks") setCurrentBreadcrumbData({ segment: "stacks", data: null });
		if (segment === "components") setCurrentBreadcrumbData({ segment: "components", data: null });
	}, [segment]);

	return (
		<PageHeader>
			<h1 className="text-display-xs font-semibold capitalize">{segment}</h1>
		</PageHeader>
	);
}
