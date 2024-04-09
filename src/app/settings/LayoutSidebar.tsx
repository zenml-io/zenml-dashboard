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

export function TenantSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "General",
				href: routes.settings.general
			},
			{
				name: "Members",
				href: routes.settings.members
			}
		];
	}

	const navItems = getNavItems();
	return <SettingsMenu items={navItems} />;
}
