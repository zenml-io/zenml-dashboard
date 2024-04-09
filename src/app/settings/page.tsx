import { ReactNode } from "react";
import { DisplayTenant, TenantSettingsMenu } from "./LayoutSidebar";

export default function SettingsPage({ children }: { children: ReactNode }) {
	return (
		<div className="layout-container flex flex-col gap-7 pl-5 pt-5 lg:flex-row">
			<div className="flex w-full max-w-[200px] flex-col gap-4">
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Tenant</p>
					<DisplayTenant />
					<TenantSettingsMenu />
				</div>
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
}
