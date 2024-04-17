import { routes } from "@/router/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@zenml-io/react-component-library";
import { SettingsMenu } from "./Menu";

export function DisplayTenant() {
	return (
		<div className="flex w-full items-center gap-2 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-2">
			<Avatar size="md" type="square">
				<AvatarImage src="https://avatar.vercel.sh/default?size=24" />
				<AvatarFallback size="md">D</AvatarFallback>
			</Avatar>
			<p className="truncate text-text-sm font-semibold">{"default"}</p>
		</div>
	);
}

export function ServerSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "Members",
				href: routes.settings.members
			},
			{
				name: "Repositories",
				href: routes.settings.repositories
			},
			{
				name: "Secrets",
				href: routes.settings.secrets
			},
			{
				name: "Connectors",
				href: routes.settings.connectors
			}
		];
	}

	const navItems = getNavItems();
	return <SettingsMenu items={navItems} />;
}

export function ProfileSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "Profile",
				href: routes.settings.profile
			}
		];
	}

	const navItems = getNavItems();
	return <SettingsMenu items={navItems} />;
}
