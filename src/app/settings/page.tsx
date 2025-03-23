import { Outlet } from "react-router-dom";
import { DisplayServer, ServerSettingsMenu } from "./LayoutSidebar";
import { VersionDisplay } from "./VersionDisplay";

export default function SettingsPage() {
	return (
		<div className="layout-container flex flex-col gap-7 pt-5 lg:flex-row lg:px-10">
			<div className="flex shrink-0 flex-col gap-4 lg:w-[200px]">
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Server</p>
					<DisplayServer />
					<ServerSettingsMenu />
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
