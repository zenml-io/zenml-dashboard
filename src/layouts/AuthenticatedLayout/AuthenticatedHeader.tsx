import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { routes } from "@/router/routes";
import { Link } from "react-router-dom";
import { UserDropdown } from "./UserDropdown";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { WorkspaceLink } from "@/components/breadcrumbs/workspace-link";
import { ProjectLink } from "@/components/breadcrumbs/project-link";
export function AuthenticatedHeader() {
	return (
		<header className="h-9 border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="flex h-full items-center justify-between">
				<Link
					to={routes.projects.overview}
					className="flex h-full w-9 flex-shrink-0 items-center justify-center border-r border-theme-border-moderate"
				>
					<ZenMLIcon className="h-6 w-6 fill-theme-text-brand" />
				</Link>
				<div className="flex h-full flex-1 items-center gap-0.5 overflow-x-auto pl-1">
					<WorkspaceLink />
					<ProjectLink />
					<Breadcrumbs />
				</div>
				<div className="ml-auto pl-3 pr-4">
					<UserDropdown />
				</div>
			</div>
		</header>
	);
}
