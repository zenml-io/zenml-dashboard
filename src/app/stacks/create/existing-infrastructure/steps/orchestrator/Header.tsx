import { ComponentIcon } from "@/components/ComponentIcon";

export function OrchestratorHeader() {
	return (
		<section className="space-y-5 py-5 first:pt-0 last:pb-0">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<ComponentIcon type="orchestrator" className="h-5 w-5 fill-primary-400" />
					Select your Orchestrator
				</p>
				<p className="text-theme-text-secondary">
					Select one of the connected orchestrators for your new stack
				</p>
			</div>
		</section>
	);
}
