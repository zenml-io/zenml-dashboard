import { useServerSettings } from "@/data/server/get-server-settings";
import { getGradientImage } from "@/lib/images";
import { routes } from "@/router/routes";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@zenml-io/react-component-library";
import { SettingsMenu } from "../Menu";

export function DisplayServer() {
	const { data, isError, isPending } = useServerSettings({
		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-9 w-full" />;
	if (isError) return null;

	return (
		<div className="flex w-full items-center gap-2 rounded-md border border-theme-border-moderate bg-theme-surface-primary p-2">
			<Avatar size="md" type="square">
				<AvatarImage src={getGradientImage(data.body?.server_name || "default")} />
				<AvatarFallback size="md">{data.body?.server_name[0] || "D"}</AvatarFallback>
			</Avatar>
			<p className="truncate text-text-sm font-semibold">{data.body?.server_name}</p>
		</div>
	);
}

export function ServerSettingsMenu() {
	function getNavItems() {
		return [
			{
				name: "General",
				href: routes.settings.general
			},
			{
				name: "Members",
				href: routes.settings.members
			},
			{
				name: "API Tokens",
				href: routes.settings.apiTokens
			},
			{
				name: "Secrets",
				href: routes.settings.secrets.overview,
				isActiveOverride: (pathname: string) =>
					pathname.startsWith(routes.settings.secrets.overview)
			},
			{
				name: "Connectors",
				href: routes.settings.connectors.overview,
				isActiveOverride: (pathname: string) =>
					pathname.startsWith(routes.settings.connectors.overview)
			},
			{
				name: "Service Accounts",
				href: routes.settings.service_accounts.overview,
				isActiveOverride: (pathname: string) =>
					pathname.startsWith(routes.settings.service_accounts.overview)
			},
			{
				name: "MCP",
				href: routes.settings.mcp
			},
			{
				name: "Notifications",
				href: routes.settings.notifications
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
