import { SupportCard, ResourcesCard } from "@/components/fallback-pages/Cards";
import { HeaderOnboardingBox } from "./Header";
import { OnboardingSetupList } from "./Setup";
import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";

export default function OnboardingPage() {
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
		<div className="layout-container grid grid-cols-4 gap-5 py-5">
			<div className="col-span-4 space-y-5 lg:col-span-3">
				<HeaderOnboardingBox />
				<OnboardingSetupList />
			</div>
			<div className="col-span-4 space-y-5 lg:col-span-1">
				<SupportCard />
				<ResourcesCard />
			</div>
		</div>
	);
}
