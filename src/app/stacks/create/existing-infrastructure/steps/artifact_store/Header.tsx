import Folder from "@/assets/icons/folder.svg?react";

export function ArtifactStoreHeader() {
	return (
		<div className="space-y-1">
			<p className="flex items-center gap-1 text-text-lg font-semibold">
				<Folder className="h-5 w-5 fill-primary-400" />
				Select your Artifact Store
			</p>
			<p className="text-theme-text-secondary">
				Choose one of the storages for the new Artifact Store.
			</p>
		</div>
	);
}
