import { ComponentIcon } from "@/components/ComponentIcon";

export function ArtifactStoreHeader() {
	return (
		<div className="space-y-1">
			<p className="flex items-center gap-1 text-text-lg font-semibold">
				<ComponentIcon type="artifact_store" className="h-5 w-5 fill-primary-400" />
				Select your Artifact Store
			</p>
			<p className="text-theme-text-secondary">
				Choose one of the storages for the new Artifact Store.
			</p>
		</div>
	);
}
