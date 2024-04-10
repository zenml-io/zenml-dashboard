import { ReactNode } from "react";
import { DisplayTenant, TenantSettingsMenu } from "./LayoutSidebar";
import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { CompleteAvatar } from "@/components/CompleteAvatar";

export default function SettingsPage({ children }: { children: ReactNode }) {
	return (
		<div className="layout-container flex flex-col gap-7 px-10 pt-5 lg:flex-row">
			<div className="flex w-full max-w-[200px] flex-col gap-4">
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Server</p>
					<DisplayTenant />
					<TenantSettingsMenu />
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Account</p>
					<CompleteAvatar
						name="Jane Cooper"
						size="sm"
						type="rounded"
						email="janecooper@company.inc"
						avatarUrl="https://avatar.vercel.sh/default?size=24"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">Version</p>
					<div className="rounded-md border border-theme-border-moderate bg-theme-surface-primary p-3">
						<div className="mb-2 flex items-center">
							<ZenMLIcon className="h-4 w-4 fill-theme-text-brand" />
							<p className="ml-2 text-text-sm  font-semibold">Open source</p>
						</div>
						<p className="mb-1 text-text-sm text-theme-text-tertiary">ZenML 0.55.5</p>
						<p className="text-text-sm text-theme-text-tertiary">UI Version 0.16.0</p>
					</div>
				</div>
			</div>

			<div className="w-full">{children}</div>
		</div>
	);
}
