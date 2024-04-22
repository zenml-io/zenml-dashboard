import { FallbackSupportCard, ResourcesCard } from "@/components/fallback-pages/Cards";
import { HeaderOnboardingBox } from "./Header";
import { StarterSetupList } from "./StarterSetup";

export default function OnboardingPage() {
	return (
		<div className="layout-container grid grid-cols-4 gap-5 py-5">
			<div className="col-span-4 space-y-5 lg:col-span-3">
				<HeaderOnboardingBox />
				<StarterSetupList />
				{/* <ProductionSetupChecklist /> */}
			</div>
			<div className="col-span-4 space-y-5 lg:col-span-1">
				<FallbackSupportCard />
				<ResourcesCard />
			</div>
		</div>
	);
}
