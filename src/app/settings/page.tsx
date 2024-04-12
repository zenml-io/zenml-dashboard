import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { useCurrentUser } from "@/data/user/current-user-query";
import { Outlet } from "react-router-dom";
import { DisplayTenant, ProfileSettingsMenu, ServerSettingsMenu } from "./LayoutSidebar";
import { InlineAvatar } from "@/components/InlineAvatar";

export default function SettingsPage() {
	const { data } = useCurrentUser();

	const VersionDisplay = () => (
		<div className="rounded-md border border-theme-border-moderate bg-theme-surface-primary p-3">
			<div className="mb-2 flex items-center">
				<ZenMLIcon className="h-4 w-4 fill-theme-text-brand" />
				<p className="ml-2 text-text-sm  font-semibold">Open source</p>
			</div>
			<p className="mb-1 text-text-sm text-theme-text-tertiary">ZenML 0.55.5</p>
			<p className="text-text-sm text-theme-text-tertiary">UI Version 0.16.0</p>
		</div>
	);

	return (
		<div className="layout-container flex flex-col gap-7 px-10 pt-5 lg:flex-row">
			<div className="flex w-full max-w-[200px] flex-col gap-4">
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Server</p>
					<DisplayTenant />
					<ServerSettingsMenu />
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Account</p>
					<InlineAvatar username={data?.name || "User"} />
				</div>
				<div className="flex flex-col gap-4">
					<ProfileSettingsMenu />
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Version</p>
					<VersionDisplay />
				</div>
			</div>
			<div className="w-full">
				<Outlet />
			</div>
		</div>
	);
}
