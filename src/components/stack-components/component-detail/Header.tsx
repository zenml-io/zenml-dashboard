import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library/components/client";
import { Badge, Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

			<ComponentDetailDropdown componentId={componentId} />
		</PageHeader>
	);
}

function ComponentId({ componentId, isPanel }: Props & { isPanel: boolean }) {
	const component = useComponent(componentId);
	const path = useLocation().pathname;
	const segment = path.split("/").at(-1) as "edit" | null;

	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	useEffect(() => {
		if (component.data && !isPanel) {
			if (segment === "edit") {
				setCurrentBreadcrumbData({ segment: "componentEdit", data: component.data });
			} else {
				setCurrentBreadcrumbData({ segment: "componentDetail", data: component.data });
			}
		}
	}, [component.data, isPanel, segment]);

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

function ComponentDetailDropdown({ componentId }: Props) {
	const navigate = useNavigate();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					intent="secondary"
					emphasis="minimal"
					className="flex aspect-square items-center justify-center"
				>
					<DotsIcon className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem
					onSelect={() => navigate(routes.components.edit(componentId))}
					className="cursor-pointer space-x-2"
				>
					<Edit className="h-3 w-3 fill-neutral-400" />
					<p>Edit</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
