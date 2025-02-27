import { InlineAvatar } from "@/components/InlineAvatar";
import { PageHeader } from "@/components/PageHeader";
import { useCurrentUser } from "@/data/users/current-user-query";
import { getUsername } from "@/lib/user";
import { Skeleton } from "@zenml-io/react-component-library";
import { Outlet } from "react-router-dom";
import { DisplayServer, ProfileSettingsMenu, ServerSettingsMenu } from "./LayoutSidebar";
import { VersionDisplay } from "./VersionDisplay";

export default function SettingsPage() {
	const { data } = useCurrentUser();

	return (
		<div>
			<PageHeader>
				<h2 className="text-display-xs font-semibold">Settings</h2>
			</PageHeader>
			<div className="layout-container flex flex-col gap-7 pt-5 lg:flex-row">
				<div className="flex shrink-0 flex-col gap-4 lg:w-[200px]">
					<div className="flex flex-col gap-4">
						<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Server</p>
						<DisplayServer />
						<ServerSettingsMenu />
					</div>
					{data ? (
						<div className="flex flex-col gap-4">
							<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">
								Account
							</p>
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
				<div className="w-full overflow-x-hidden">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
