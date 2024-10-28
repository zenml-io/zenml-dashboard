import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";
import { StackList } from "./StackList";
import { ResumeBanners } from "./ResumeBanner";

export default function StacksPage() {
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
		<div className="space-y-5">
			<ResumeBanners />
			<StackList />
		</div>
	);
}
