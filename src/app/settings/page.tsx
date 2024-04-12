import { useCurrentUser } from "@/data/users/current-user-query";
import { Outlet } from "react-router-dom";
import { DisplayTenant, ProfileSettingsMenu, ServerSettingsMenu } from "./LayoutSidebar";
import { InlineAvatar } from "@/components/InlineAvatar";
import { VersionDisplay } from "./VersionDisplay";

export default function SettingsPage() {
	const { data } = useCurrentUser();

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
