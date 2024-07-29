import { ComponentIcon } from "@/components/ComponentIcon";

export function ContainerRegistryHeader() {
	return (
		<section className="space-y-5 py-5 first:pt-0 last:pb-0">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<ComponentIcon type="container_registry" className="h-5 w-5 fill-primary-400" />
					Select your Container Registry
				</p>
				<p className="text-theme-text-secondary">
					Select one of the Container Registries for your new stack
				</p>
			</div>
		</section>
	);
}
