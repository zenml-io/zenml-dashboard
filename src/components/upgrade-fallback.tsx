import IconBox from "@/assets/icons/icon-box.svg?react";
import CloudTenant from "@/assets/icons/cloud-tenant.svg?react";
import Tag from "@/assets/icons/tag.svg?react";
import Folder from "@/assets/icons/folder.svg?react";
import Switch from "@/assets/icons/switch-horizontal.svg?react";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import Arrow from "@/assets/icons/arrow-right.svg?react";
import { useServerInfo } from "@/data/server/info-query";

export function UpgradeFallback() {
	return (
		<>
			<Headline />
			<FeatureGrid />
			<ButtonGroup />
		</>
	);
}

function Headline() {
	return (
		<section className="flex flex-col items-center gap-5">
			<IconBox className="shrink-0" />
			<div className="space-y-2 text-center">
				<h2 className="text-display-xs font-semibold">Your ZenML Pro Dashboard needs an upgrade</h2>
				<p className="text-text-lg text-theme-text-secondary">
					Upgrade to 0.80.0 to unlock powerful new ZenML Pro features and improvements
				</p>
			</div>
		</section>
	);
}

function FeatureGrid() {
	return (
		<section className="grid max-w-[1280px] grid-cols-1 gap-5 lg:grid-cols-2">
			<div className="flex space-x-3">
				<CloudTenant width={32} height={32} className="shrink-0 fill-primary-400" />
				<div className="space-y-1">
					<h3 className="font-semibold">Tenants are now workspaces</h3>
					<p className="text-text-sm text-theme-text-secondary">
						We're renaming "Tenants" to "Workspaces." All stacks, secrets, and service connectors
						will remain workspace-scoped.
					</p>
				</div>
			</div>
			<div className="flex space-x-3">
				<Folder width={32} height={32} className="shrink-0 fill-primary-400" />
				<div className="space-y-1">
					<h3 className="font-semibold">New Projects Feature</h3>
					<p className="text-text-sm text-theme-text-secondary">
						You can create separate namespaces for artifacts and pipelines within a single
						workspace, enabling better team collaboration
					</p>
				</div>
			</div>
			<div className="flex space-x-3">
				<Tag width={32} height={32} className="shrink-0 fill-primary-400" />
				<div className="space-y-1">
					<h3 className="font-semibold">Improved Tagging</h3>
					<p className="text-text-sm text-theme-text-secondary">
						Enhanced tagging system for easier ML asset categorization, search, and management.
					</p>
				</div>
			</div>

			<div className="flex space-x-3">
				<Switch width={32} height={32} className="shrink-0 fill-primary-400" />
				<div className="space-y-1">
					<h3 className="font-semibold">Automatic Migration</h3>
					<p className="text-text-sm text-theme-text-secondary">
						Existing pipelines and artifacts automatically migrated to a "Default" project for
						smooth transition.
					</p>
				</div>
			</div>
		</section>
	);
}

function ButtonGroup() {
	return (
		<section className="flex items-center gap-3">
			<UpgradeButton />
		</section>
	);
}

function UpgradeButton() {
	const serverInfo = useServerInfo();
	if (serverInfo.isPending) return <Skeleton className="h-7 w-[200px]" />;
	if (serverInfo.isError) return null;

	const serverInfoData = serverInfo.data;

	return (
		<Button asChild size="md">
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={`${serverInfoData.pro_dashboard_url}/workspaces/${serverInfoData.id}/settings/updates`}
			>
				<Arrow width={24} height={24} className="shrink-0 rotate-[270deg] fill-white" />
				Upgrade to 0.80.0
			</a>
		</Button>
	);
}
