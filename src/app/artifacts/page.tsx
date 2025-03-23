import { PageHeader } from "@/components/PageHeader";
import { UpgradeFallback } from "@/components/upgrade-fallback";
import { CommandSection } from "./Fragments";

export default function ModelsPage() {
	return (
		<div>
			<PageHeader className="flex items-center gap-1">
				<h1 className="text-display-xs font-semibold">Artifacts</h1>
			</PageHeader>
			<div className="layout-container flex flex-col items-center space-y-7 py-5">
				<UpgradeFallback />
				<CommandSection />
			</div>
		</div>
	);
}
