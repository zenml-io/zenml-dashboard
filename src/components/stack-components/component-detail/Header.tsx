import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { Skeleton, Badge } from "@zenml-io/react-component-library/components/server";
import { useComponent } from "./hooks";
import { useEffect } from "react";
import { PageHeader } from "../../PageHeader";
import { useBreadcrumbsContext } from "../../../layouts/AuthenticatedLayout/BreadcrumbsContext";
import { CopyButton } from "../../CopyButton";

type Props = {
	componentId: string;
};
export function StackComponentsDetailHeader({
	componentId,
	isPanel
}: Props & { isPanel: boolean }) {
	return (
		<PageHeader className="space-y-1">
			<ComponentId isPanel={isPanel} componentId={componentId} />
			<div className="flex items-center space-x-1">
				<ComponentIcon componentId={componentId} />
				<ComponentName componentId={componentId} />
				<ComponentType componentId={componentId} />
			</div>
		</PageHeader>
	);
}

function ComponentId({ componentId, isPanel }: Props & { isPanel: boolean }) {
	const component = useComponent(componentId);
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	useEffect(() => {
		if (component.data && !isPanel) {
			setCurrentBreadcrumbData({ segment: "componentDetail", data: component.data });
		}
	}, [component.data, isPanel]);

	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-6 w-[200px]" />;
	const id = component.data.id;
	return (
		<div className="group/copybutton flex items-center gap-0.5">
			<p className="text-text-sm text-theme-text-secondary">{id}</p>
			<CopyButton copyText={id} />
		</div>
	);
}

function ComponentName({ componentId }: Props) {
	const component = useComponent(componentId);

	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-6 w-[100px]" />;
	return <p className="truncate text-display-xs font-semibold">{component.data.name}</p>;
}

function ComponentIcon({ componentId }: Props) {
	const component = useComponent(componentId);

	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-5 w-5" />;
	return (
		<img
			className="h-5 w-5"
			src={sanitizeUrl(component.data.body?.logo_url || "")}
			alt={`Icon of component ${component.data.name}`}
		/>
	);
}

function ComponentType({ componentId }: Props) {
	const component = useComponent(componentId);

	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-6 w-[100px]" />;
	return (
		<Badge
			className="whitespace-nowrap rounded-md bg-turquoise-25 font-semibold text-turquoise-700"
			color="turquoise"
			rounded={false}
		>
			{snakeCaseToTitleCase(component.data.body?.type || "")}
		</Badge>
	);
}
