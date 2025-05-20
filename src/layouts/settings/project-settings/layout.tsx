import { InlineAvatar } from "@/components/InlineAvatar";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { Outlet } from "react-router-dom";
import { DisplayProject } from "./project-display";
import { routes } from "@/router/routes";
import { SettingsMenu } from "../Menu";

export function ProjectSettingsLayout() {
	const { data } = useCurrentUser();

	return (
		<div className="layout-container flex flex-col gap-7 py-5 lg:flex-row">
			<div className="flex shrink-0 flex-col gap-4 lg:w-[200px]">
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Project</p>
					<DisplayProject />
					<ProjectSettingsMenu />
				</div>
				{data ? (
					<div className="flex flex-col gap-4">
						<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Account</p>
						<InlineAvatar username={data.name} />
					</div>
				) : (
					<Skeleton className="h-[70px] w-full" />
				)}

				<div className="flex flex-col gap-4">
					<ProfileSettingsMenu />
				</div>
			</div>
			<div className="w-full">
				<Outlet />
			</div>
		</div>
	);
}

function ProjectSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "Repositories",
				href: routes.projects.settings.repositories.overview
			}
		];
	}

	const navItems = getNavItems();
	return <SettingsMenu items={navItems} />;
}

function ProfileSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "Profile",
				href: routes.projects.settings.profile
			}
		];
	}

	const navItems = getNavItems();
	return <SettingsMenu items={navItems} />;
}
