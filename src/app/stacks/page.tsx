import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";
import { StacksHeader } from "./Fallback/Fragments";
import { StackList } from "./StackList";

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
		<div>
			<StacksHeader />
			<StackList />
		</div>
	);
}
