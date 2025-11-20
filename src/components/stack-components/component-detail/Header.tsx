import { componentBreadcrumb } from "@/components/breadcrumbs/library";
import { BreadcrumbSegment } from "@/components/breadcrumbs/types";
import { UpdateButtonContent } from "@/components/buttons/update-button-content";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { routes } from "@/router/routes";
import { Badge, Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../layouts/AuthenticatedLayout/BreadcrumbsContext";
import { CopyButton } from "../../CopyButton";
import { PageHeader } from "../../PageHeader";
import { useComponent } from "./hooks";

type Props = {
	componentId: string;
};
export function StackComponentsDetailHeader({
	componentId,
	isPanel
}: Props & { isPanel: boolean }) {
	const path = useLocation().pathname;
	const segment = path.split("/").at(-1) as "edit" | null;
	return (
		<PageHeader className="flex items-center justify-between space-y-1">
			<div className="space-y-1">
				<ComponentId isPanel={isPanel} componentId={componentId} />
				<div className="flex items-center space-x-1">
					<ComponentIcon componentId={componentId} />
					<ComponentName componentId={componentId} />
					<ComponentType componentId={componentId} />
				</div>
			</div>
			{segment === "edit" ? null : <ComponentEditButton componentId={componentId} />}
		</PageHeader>
	);
}

function ComponentId({ componentId, isPanel }: Props & { isPanel: boolean }) {
	const component = useComponent(componentId);
	const path = useLocation().pathname;
	const segment = path.split("/").at(-1) as "edit" | null;

	const { setBreadcrumbs } = useBreadcrumbsContext();
	useEffect(() => {
		if (component.data && !isPanel) {
			const breadcrumbs: BreadcrumbSegment[] = [
				componentBreadcrumb,
				{
					label: component.data.name || "",
					href: routes.components.detail(component.data.id)
				}
			];
			if (segment === "edit") {
				setBreadcrumbs([
					...breadcrumbs,
					{
						label: "Edit",
						href: routes.components.edit(component.data.id)
					}
				]);
			} else {
				setBreadcrumbs(breadcrumbs);
			}
		}
	}, [component.data, isPanel, segment, setBreadcrumbs, componentId]);

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

function ComponentEditButton({ componentId }: Props) {
	return (
		<Button asChild type="button" size="sm" intent="primary" emphasis="subtle">
			<Link to={routes.components.edit(componentId)}>
				<UpdateButtonContent />
			</Link>
		</Button>
	);
}
