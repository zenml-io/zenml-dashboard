import { PageHeader } from "@/components/PageHeader";
import { useTourContext } from "@/components/tour/TourContext";
import { UpgradeFallback } from "@/components/upgrade-fallback";
import { CommandSection } from "./Fragments";
import { useEffect } from "react";

export default function ModelsPage() {
	const {
		setTourState,
		tourState: { tourActive }
	} = useTourContext();

	useEffect(() => {
		if (tourActive) {
			setTourState((prev) => ({ ...prev, run: true, stepIndex: prev.stepIndex }));
		}
	}, [tourActive]);

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
