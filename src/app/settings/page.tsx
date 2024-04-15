import { useCurrentUser } from "@/data/users/current-user-query";
import { Outlet } from "react-router-dom";
import { DisplayTenant, ProfileSettingsMenu, ServerSettingsMenu } from "./LayoutSidebar";
import { InlineAvatar } from "@/components/InlineAvatar";
import { VersionDisplay } from "./VersionDisplay";
import { getUsername } from "@/lib/user";
import { Skeleton } from "@zenml-io/react-component-library";

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
				{data ? (
					<div className="flex flex-col gap-4">
						<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Account</p>
						<InlineAvatar username={getUsername(data)} />
					</div>
				) : (
					<Skeleton className="h-[70px] w-full" />
				)}

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
